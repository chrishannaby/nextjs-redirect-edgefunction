import { Context } from "netlify:edge";
const pathRegex = /^https:\/\/www2-stage.aapc.com/;
const proxyUrl = "/.netlify/functions/login";

export default async (request: Request, context: Context) => {
  const response = await fetch(proxyUrl);
  const locationHeader = response.headers.get("Location");
  if (locationHeader && pathRegex.test(locationHeader)) {
    response.headers.set("Location", locationHeader.replace(pathRegex, ""));
  }

  return response;
};
