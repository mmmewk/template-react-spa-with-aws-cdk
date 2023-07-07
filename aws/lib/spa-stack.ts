import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as certificatemanager from "aws-cdk-lib/aws-certificatemanager";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";

// Stack for bootin up a single page application on a subdomain of your website
export class SpaStack extends cdk.Stack {
  bucket: cdk.aws_s3.Bucket;
  cloudfrontDistribution: cdk.aws_cloudfront.Distribution;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const subdomain = process.env.SUBDOMAIN;
    const topLevelDomain = process.env.DOMAIN;
    const domain = `${subdomain}.${topLevelDomain}`;

    if (!subdomain) throw Error("Add SUBDOMAIN to your ENV vars");
    if (!topLevelDomain) throw Error("Add DOMAIN to your ENV vars");

    // S3 bucket to store the built application
    this.bucket = new s3.Bucket(this, "S3 Bucket", {
      bucketName: `www.${domain}`,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Access Identity to allow cloudfront to use the s3 bucket
    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(
      this,
      "Cloudfront Origin Access Identity",
      {
        comment: `OAI for ${domain}.`,
      }
    );

    const renderSpaLambdaArn = process.env.RENDER_SPA_LAMBDA_ARN;
    const acmCertificateArn = process.env.ACM_CERTIFICATE_ARN;

    if (!renderSpaLambdaArn)
      throw Error("Add RENDER_SPA_LAMBDA_ARN to your ENV vars");
    if (!acmCertificateArn)
      throw Error("Add ACM_CERTIFICATE_ARN to your ENV vars");

    // Lambda to redirect all traffic to index.html
    //
    const renderSpaLambda = lambda.Version.fromVersionArn(
      this,
      "Render SPA Lambda Version",
      renderSpaLambdaArn
    );
    const certificate = certificatemanager.Certificate.fromCertificateArn(
      this,
      "acmCertificate",
      acmCertificateArn
    );

    // Cloudfront distribution, takes all incoming traffic for subdomain.topLevelDomain and routes it to the s3 bucket index.html
    this.cloudfrontDistribution = new cloudfront.Distribution(
      this,
      "Cloudfront Distribution",
      {
        certificate,
        priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
        domainNames: [domain],
        defaultBehavior: {
          origin: new origins.S3Origin(this.bucket),
          edgeLambdas: [
            {
              functionVersion: renderSpaLambda,
              eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
            },
          ],
        },
      }
    );

    // IAM roles for Cloudfront only access to S3
    const cloudfrontS3Access = new iam.PolicyStatement();
    cloudfrontS3Access.addActions("s3:GetBucket*");
    cloudfrontS3Access.addActions("s3:GetObject*");
    cloudfrontS3Access.addActions("s3:List*");
    cloudfrontS3Access.addResources(this.bucket.bucketArn);
    cloudfrontS3Access.addResources(`${this.bucket.bucketArn}/*`);
    cloudfrontS3Access.addCanonicalUserPrincipal(
      cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
    );

    this.bucket.addToResourcePolicy(cloudfrontS3Access);

    // mekoppe.com route53 hosted zone
    const hostedZone = route53.HostedZone.fromLookup(this, "Hosted Zone", {
      domainName: topLevelDomain,
    });

    // Alias to cloudfront distribution
    const aliasTarget = route53.RecordTarget.fromAlias(
      new targets.CloudFrontTarget(this.cloudfrontDistribution)
    );

    // Record routing traffic from the subdomain to cloudfront
    new route53.ARecord(this, "Route 53 Alias Record", {
      zone: hostedZone,
      recordName: domain,
      target: aliasTarget,
    });

    // Outputs the command to deploy the application to the console
    new cdk.CfnOutput(this, "Deploy Command", {
      description: "Command to sync the built project to s3",
      value: `aws s3 sync ./build s3://${this.bucket.bucketName} --delete`,
    });

    new cdk.CfnOutput(this, "Cloudfront Invalidate Command", {
      description:
        "command to invalidate the cloudfront distribution when new code is deployed",
      value: `aws cloudfront create-invalidation --distribution-id ${this.cloudfrontDistribution.distributionId} --paths '/*'`,
    });
  }
}
