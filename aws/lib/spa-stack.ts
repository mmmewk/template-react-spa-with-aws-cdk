import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as codebuild from "aws-cdk-lib/aws-codebuild";

// Stack for bootin up a single page application on a subdomain of your website
export class SpaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const subdomain = process.env.SUBDOMAIN;
    const topLevelDomain = process.env.DOMAIN;
    const domain = `${subdomain}.${topLevelDomain}`;

    if (!subdomain) throw Error("Add SUBDOMAIN to your ENV vars");
    if (!topLevelDomain) throw Error("Add DOMAIN to your ENV vars");

    // S3 bucket to store the built application
    const bucket = new s3.Bucket(this, "S3 Bucket", {
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

    // Cloudfront distribution, takes all incoming traffic for subdomain.topLevelDomain and routes it to the s3 bucket index.html
    const cloudfrontDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "Cloudfront Distribution",
      {
        viewerCertificate: {
          aliases: [domain],
          props: {
            acmCertificateArn,
            sslSupportMethod: "sni-only",
          },
        },
        priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
              originAccessIdentity: cloudFrontOAI,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                lambdaFunctionAssociations: [
                  {
                    eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
                    lambdaFunction: renderSpaLambda,
                  },
                ],
              },
            ],
          },
        ],
      }
    );

    // IAM roles for Cloudfront only access to S3
    const cloudfrontS3Access = new iam.PolicyStatement();
    cloudfrontS3Access.addActions("s3:GetBucket*");
    cloudfrontS3Access.addActions("s3:GetObject*");
    cloudfrontS3Access.addActions("s3:List*");
    cloudfrontS3Access.addResources(bucket.bucketArn);
    cloudfrontS3Access.addResources(`${bucket.bucketArn}/*`);
    cloudfrontS3Access.addCanonicalUserPrincipal(
      cloudFrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
    );

    bucket.addToResourcePolicy(cloudfrontS3Access);

    // mekoppe.com route53 hosted zone
    const hostedZone = route53.HostedZone.fromLookup(this, "Hosted Zone", {
      domainName: topLevelDomain,
    });

    // Alias to cloudfront distribution
    const aliasTarget = route53.RecordTarget.fromAlias(
      new targets.CloudFrontTarget(cloudfrontDistribution)
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
      value: `aws s3 sync ./build s3://${bucket.bucketName} --delete`,
    });

    new cdk.CfnOutput(this, "Cloudfront Invalidate Command", {
      description:
        "command to invalidate the cloudfront distribution when new code is deployed",
      value: `aws cloudfront create-invalidation --distribution-id ${cloudfrontDistribution.distributionId} --paths '/*'`,
    });
  }
}
