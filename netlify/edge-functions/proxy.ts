import { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  context.cookies.set({
    name: "netlify",
    value: "hello",
    domain: "moneytronicswag.com",
  });
};
