import cookieSession from "cookie-session";
import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";
import "../database";
import { HttpError } from "../error/errors";
import passport from "./passport";

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
  .use((req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    if (!req.user) {
      next(HttpError.Unauthorised());
    } else {
      next();
    }
  });
