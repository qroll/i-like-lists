import argon2 from "argon2";
import { serialize } from "cookie";
import { NextApiResponse } from "next";
import { z } from "zod";
import { HttpError } from "../../lib/error/errors";
import User from "../../lib/models/user";
import { ApiController } from "../../utils/api";
import { encryptAndSignCookie, generateCsrf } from "../../utils/api/cookie";
import { Api, Body, Method, Res } from "../../utils/api/decorators";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

class LoginController extends ApiController {
  @Method({ bodySchema: loginSchema })
  async post(@Res res: NextApiResponse, @Body body: z.infer<typeof loginSchema>) {
    const { username, password } = body;
    const user = await User.query().findOne("username", username);

    if (!user) {
      throw HttpError.Unauthorised();
    }

    const hasMatchingPassword = await argon2.verify(user.password, password, {
      type: argon2.argon2id,
    });

    if (!hasMatchingPassword) {
      throw HttpError.Unauthorised();
    }

    // set session cookies
    const { csrfSecret, csrfToken } = await generateCsrf();
    const cookie = encryptAndSignCookie({ csrfSecret, userId: user.id });

    res.setHeader("Set-Cookie", [
      serialize("csrf", csrfToken, {
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/",
      }),
      serialize("session", cookie, {
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        path: "/",
      }),
    ]);

    res.status(200).json({ redirectUrl: "/home" });
  }
}

export default Api(LoginController);
