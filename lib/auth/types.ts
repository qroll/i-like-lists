import { NextApiRequest } from "next";
import User from "../models/user";

export interface ApiRequest extends NextApiRequest {
  user: User;
}
