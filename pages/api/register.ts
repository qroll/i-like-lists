import argon2 from "argon2";
import { NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import "../../lib/database";
import { HttpError } from "../../lib/error/errors";
import User from "../../lib/models/user";
import { ApiController } from "../../utils/api";
import { Api, Body, Method, Res } from "../../utils/api/decorators";

const registerSchema = z.object({
  username: z.string().min(1).max(256),
  password: z.string().min(10).max(128),
  email: z.string().optional(),
});

class RegisterController extends ApiController {
  @Method({ bodySchema: registerSchema })
  async post(@Res res: NextApiResponse, @Body input: z.infer<typeof registerSchema>) {
    const { username, password } = input;

    const user = await User.query().findOne("username", username);

    if (user) {
      const error = HttpError.BadRequest("Username exists");
      error.errorCode = "ERR_USERNAME_EXISTS";
      throw error;
    }

    const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });

    await User.query().insert({
      id: uuidv4(),
      username: username,
      password: hashedPassword,
    });

    res.redirect("/login");
  }
}

export default Api(RegisterController);
