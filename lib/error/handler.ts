import { HttpError } from "./errors";

export const defaultErrorHandler = (err, req, res, next): void => {
  console.log(`[ERROR] ${err.message}`);

  if (err instanceof HttpError) {
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
