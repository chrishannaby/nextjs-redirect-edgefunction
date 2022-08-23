import { Context } from "netlify:edge";
const proxyUrl = "https://www2-stage.aapc.com/account";

export default async (request: Request, context: Context) => {
  const response = await fetch(proxyUrl);
  return response;
};
