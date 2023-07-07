import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";

export interface Props extends cdk.StackProps {
  cloudfrontDistribution: cdk.aws_cloudfront.Distribution;
}

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const index = new lambdaNodeJS.NodejsFunction(this, "index", {
      entry: "api/index.ts",
      handler: "handler",
    });

    const api = new apiGateway.LambdaRestApi(this, "api", {
      handler: index,
      proxy: false,
    });

    // Add API to cloudfront distribution
    const distribution = props.cloudfrontDistribution;
    distribution.addBehavior("/api*", new origins.RestApiOrigin(api));

    const root = api.root.addResource("api");

    // GET /api
    root.addMethod("GET", new apiGateway.LambdaIntegration(index));

    // Items API
    const items = root.addResource("items");

    // GET /api/items
    items.addMethod(
      "GET",
      new apiGateway.LambdaIntegration(
        new lambdaNodeJS.NodejsFunction(this, "positionsIndex", {
          entry: "api/items/index.ts",
          handler: "handler",
        })
      )
    );
  }
}
