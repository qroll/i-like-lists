import cookieSession from "cookie-session";
import { NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";
import "../database";
import { HttpError } from "../error/errors";
import passport from "./passport";
import { ApiRequest } from "./types";

const sessionMiddleware = nc()
  .use(
    cookieSession({
      name: "session",
      secret: "secret!", // TODO: use key
    })
  )
  .use(passport.initialize())
  .use(passport.session());

export default sessionMiddleware;

export const authMiddleware = nc()
  .use(sessionMiddleware)
  .use((req: ApiRequest, res: NextApiResponse, next: NextHandler) => {
    if (!req.user) {
      next(HttpError.Unauthorised());
    } else {
      next();
    }
  });
