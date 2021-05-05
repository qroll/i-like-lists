import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user";
import argon2 from "argon2";

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
        const hasMatchingPassword = await argon2.verify(user.password, password, {
          type: argon2.argon2id,
        });

        if (hasMatchingPassword) {
          done(null, user);
        } else {
          done(null, null);
        }
      }
    } catch (err) {
      done(err);
    }
  })
);

export default passport;
