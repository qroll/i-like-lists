import { NextApiRequest, NextApiResponse } from "next";

export class ApiController {
  req: NextApiRequest;
  res: NextApiResponse;

  static handler(req: NextApiRequest, res: NextApiResponse): void {
    const instance = new this(req, res);
    switch (req.method) {
      case "GET":
        return instance.get(req, res);
      case "POST":
        return instance.post(req, res);
      default:
        return instance.notFound(req, res);
    }
  }

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  get(...args: any[]): void;
  get(req: NextApiRequest, res: NextApiResponse): void {
    this.notFound(req, res);
  }

  post(...args: any[]): void;
  post(req: NextApiRequest, res: NextApiResponse): void {
    this.notFound(req, res);
  }

  private notFound(req: NextApiRequest, res: NextApiResponse) {
    res.status(404).json({
      message: "Not Found",
      errorCode: undefined,
    });
  }
}
