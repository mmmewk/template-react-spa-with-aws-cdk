# Template SPA Stack

Boots up a single page application on a subdomain of a website. Small modifications will need to be made to run on the top level domain.

## Getting started

- Run `yarn add global aws-cdk`
- Rename `.env.example` to `.env`
- These steps need to happen once between all subdomains:
  - Take the code in `render-spa.js` and deploy is as a Lambda@Edge function. Add the RENDER_SPA_LAMBDA_ARN to your ENV variables.
  - This only needs to happen once between all subdomains
  - Create a hosted zone for your domain in route53
  - Create an acm certificate for \*.topLevelDomain. Add the ACM_CERTIFICATE_ARN to your ENV variables.
- Update ENV variables with your subdomain, domain, AWS account number and desired AWS region
- Run `yarn deploy`
- This should take a few minutes, then output two commands into the console
- Replace the deploy script in `.github/workflows/deploy.yml` with these commands

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `yarn deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
