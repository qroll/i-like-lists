import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user";

passport.serializeUser<User["id"]>((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.query()
    .findOne("id", id)
    .throwIfNotFound()
    .then((user) => done(null, user))
    .catch((err) => done(err));
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.query().findOne("username", username);
      if (!user) {
        done(null, null);
      } else {
        done(null, user);
      }
    } catch (err) {
      done(err);
    }
  })
);

export default passport;
