import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import "../../lib/database";
import { HttpError } from "../../lib/error/errors";
import { apiErrorHandler } from "../../lib/error/handler";
import User from "../../lib/models/user";

import argon2 from "argon2";

const registerSchema = z.object({
  username: z.string().min(1).max(256),
  password: z.string().min(10).max(128),
  email: z.string().optional(),
});

const handler = nc({
  onError: apiErrorHandler,
}).post(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const input = registerSchema.parse(req.body);
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
);

export default handler;
