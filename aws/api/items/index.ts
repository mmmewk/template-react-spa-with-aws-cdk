import {
  Handler,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>;

export const handler: ProxyHandler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      items: [
        { id: 1, name: "test" },
        { id: 2, name: "best" },
      ],
    }),
  };
};
