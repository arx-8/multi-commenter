// @ts-check
// import produce from "immer"

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @param {import("aws-lambda").Context} context
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function handler(event, context) {
  // console.log(event, context)
  // console.log(produce)
  console.log("--------------------------------------")

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT",
    },
    body: JSON.stringify({
      message: `Hello world ${Math.floor(Math.random() * 10)}`,
    }),
  }
}
