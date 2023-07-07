#!/usr/bin/env node
import "dotenv/config";

import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SpaStack } from "../lib/spa-stack";
import { ApiStack } from "../lib/api-stack";
import camelCase from "lodash/camelCase";

const subdomain = process.env.SUBDOMAIN;
if (!subdomain) throw Error("Add SUBDOMAIN to your ENV vars");

const env = {
  account: process.env.DEFAULT_ACCOUNT,
  region: process.env.DEFAULT_REGION,
};

const app = new cdk.App();
const spaStack = new SpaStack(app, `${camelCase(subdomain)}Stack`, { env });

new ApiStack(app, `${camelCase(subdomain)}ApiStack`, {
  env,
  cloudfrontDistribution: spaStack.cloudfrontDistribution,
});
