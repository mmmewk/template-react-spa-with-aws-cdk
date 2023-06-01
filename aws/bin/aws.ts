#!/usr/bin/env node
import "dotenv/config";

import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SpaStack } from "../lib/spa-stack";

const subdomain = process.env.SUBDOMAIN;
if (!subdomain) throw Error("Add SUBDOMAIN to your ENV vars");

const app = new cdk.App();
new SpaStack(app, `${subdomain}Stack`, {
  env: {
    account: process.env.DEFAULT_ACCOUNT,
    region: process.env.DEFAULT_REGION,
  },
});
