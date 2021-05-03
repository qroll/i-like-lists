import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";
import authMiddleware from "../../lib/auth/middleware";
import { HttpError } from "../../lib/error/errors";
import { defaultErrorHandler } from "../../lib/error/handler";
import passport from "../../lib/auth/passport";

const handler = nc({
  onError: defaultErrorHandler,
})
  .use(authMiddleware)
  .use(
    async (req: NextApiRequest, res: NextApiResponse, next: NextHandler): Promise<void> => {
      await new Promise((resolve, reject) => {
        passport.authenticate("local", (err, user, info) => {
          if (err) {
            reject(err);
          } else if (!user) {
            const error = HttpError.BadRequest("Invalid credentials");
            error.errorCode = "ERR_INVALID_CREDENTIALS";
            reject(error);
          } else {
            resolve(user);
          }
        })(req, res);
      });

      next();
    }
  )
  .post((req: NextApiRequest, res: NextApiResponse) => {
    res.redirect("/home");
  });

export default handler;
