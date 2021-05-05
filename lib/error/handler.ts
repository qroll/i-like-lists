import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { ZodError } from "zod";
import { HttpError } from "./errors";

export const defaultErrorHandler = (
  err: unknown,
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
): void => {
  if (err instanceof Error) {
    console.log(`[ERROR] ${err.message}`);
  } else {
    console.log(`[ERROR] ${JSON.stringify(err)}`);
  }

  if (err instanceof ZodError) {
    res.status(400);
    res.json({
      errorCode: "ERR_INVALID_PARAMS",
      message: err.message,
    });
  } else if (err instanceof HttpError) {
    res.status(err.httpCode);
    res.json({
      errorCode: err.errorCode,
      message: err.message,
    });
  } else {
    res.status(500);
    res.json({
      message: "Unknown error",
    });
  }

  res.end();
};
