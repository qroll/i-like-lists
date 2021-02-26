import * as z from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const loginSchema = z.object({
  username: z.string().min(1),
});

const handler = nc().post((req: NextApiRequest, res: NextApiResponse): void => {
  const input = loginSchema.parse(req.body);

  res.redirect("/home");
});

export default handler;
