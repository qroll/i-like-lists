import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import "../../lib/database";
import { HttpError } from "../../lib/error/errors";
import { defaultErrorHandler } from "../../lib/error/handler";
import User from "../../lib/models/user";

const registerSchema = z.object({
  username: z.string().min(1),
});

const handler = nc({
  onError: defaultErrorHandler,
}).post(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const input = registerSchema.parse(req.body);

    const user = await User.query().findOne("username", input.username);

    if (user) {
      const error = HttpError.BadRequest("Username exists");
      error.errorCode = "ERR_USERNAME_EXISTS";
      throw error;
    }

    await User.query().insert({
      id: uuidv4(),
      username: input.username,
    });

    res.redirect("/login");
  }
);

export default handler;
