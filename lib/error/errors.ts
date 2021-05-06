const HttpErrorMessage: Record<any, string> = {
  400: "Bad request",
  401: "Unauthorised",
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

  static Unauthorised(message?: string): HttpError {
    return new HttpError(401, message);
  }
}
