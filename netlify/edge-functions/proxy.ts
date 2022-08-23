import { Context } from "netlify:edge";
const pathRegex = /^https:\/\/www2-stage.aapc.com/;
const proxyUrl =
  "https://redirect-via-edge-function.netlify.app/.netlify/functions/login";

export default async (request: Request, context: Context) => {
  const response = await fetch(proxyUrl, { redirect: "manual" });
  const locationHeader = response.headers.get("Location");
  if (locationHeader && pathRegex.test(locationHeader)) {
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Location", locationHeader.replace(pathRegex, ""));
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }
  return response;
};
