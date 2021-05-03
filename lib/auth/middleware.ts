import cookieSession from "cookie-session";
import nc from "next-connect";
import passport from "./passport";
import "../../lib/database";

const authMiddleware = nc()
  .use(
    cookieSession({
      name: "session",
      secret: "secret!", // TODO: use key
    })
  )
  .use(passport.initialize())
  .use(passport.session());

export default authMiddleware;
