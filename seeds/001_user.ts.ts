import argon2 from "argon2";
import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex("user").insert([
    {
      id: uuidv4(),
      username: "test",
      password: await argon2.hash("testpassword", { type: argon2.argon2id }),
    },
  ]);
}
