import { NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";
import sessionMiddleware from "../../lib/auth/middleware";
import { HttpError } from "../../lib/error/errors";
import { apiErrorHandler } from "../../lib/error/handler";
import passport from "../../lib/auth/passport";
import { loggingMiddleware } from "../../lib/common/logger/middleware";

const handler = nc({
  onError: apiErrorHandler,
})
  .use(loggingMiddleware)
  .use(sessionMiddleware)
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
