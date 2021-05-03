const HttpErrorMessage: Record<any, string> = {
  400: "Bad request",
  default: "Unknown error",
};

export class HttpError extends Error {
  httpCode: number;
  errorCode?: string;

  constructor(httpCode: number, message?: string) {
    const defaultMessage = message ?? HttpErrorMessage[httpCode] ?? HttpErrorMessage.default;
    super(defaultMessage);
    this.httpCode = httpCode;
  }

  static BadRequest(message?: string): HttpError {
    return new HttpError(400, message);
  }
}
