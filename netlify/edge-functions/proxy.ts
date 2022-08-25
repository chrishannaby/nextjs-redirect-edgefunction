import { Context } from "netlify:edge";
const pathRegex = /^https:\/\/www2-stage.aapc.com/;
const proxyUrlBase =
  "https://redirect-via-edge-function.netlify.app/.netlify/functions";

export default async (request: Request, context: Context) => {
  const requestPath = new URL(request.url).pathname;
  const requestQuery = new URL(request.url).search;
  const proxyUrl = proxyUrlBase + requestPath + requestQuery;
  console.log(proxyUrl);
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
