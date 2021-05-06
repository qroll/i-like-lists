import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

export const loggingMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
): void => {
  console.log(
    JSON.stringify({
      url: req.url,
      query: req.query,
      body: req.body,
    })
  );

  next();
};
