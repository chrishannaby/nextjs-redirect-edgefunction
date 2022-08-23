import { Context } from "netlify:edge";
const pathRegex = /^https:\/\/www2-stage.aapc.com/;
const proxyUrl =
  "https://redirect-via-edge-function.netlify.app/.netlify/functions/login";

export default async (request: Request, context: Context) => {
  const response = await fetch(proxyUrl, { redirect: "manual" });
  console.log(response);
  const locationHeader = response.headers.get("Location");
  if (locationHeader && pathRegex.test(locationHeader)) {
    response.headers.set("Location", locationHeader.replace(pathRegex, ""));
  }
  console.log(response.headers);
  return response;
};
