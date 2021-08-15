// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import "reflect-metadata";
import { ApiController } from "../../utils/api";
import { Api, Method, Req, Res } from "../../utils/api/decorators";

class HelloController extends ApiController {
  @Method()
  get(@Req req: NextApiRequest, @Res res: NextApiResponse) {
    res.status(200).json({
      message: "Hello",
    });
  }
}

export default Api(HelloController);
