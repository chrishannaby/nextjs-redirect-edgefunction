import { Context } from "netlify:edge";
const pathRegex = /^https:\/\/www2-stage.aapc.com/;
const proxyUrlBase =
  "https://redirect-via-edge-function.netlify.app/.netlify/functions";

export default async (request: Request, context: Context) => {
  const requestPath = new URL(request.url).pathname;
  const requestQuery = new URL(request.url).search;
  const proxyUrl = proxyUrlBase + requestPath + requestQuery;
  const newRequest = new Request(proxyUrl, request);
  console.log(newRequest);
  const response = await fetch(request, { redirect: "manual" });
  console.log(response);
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
