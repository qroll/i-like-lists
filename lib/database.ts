import { Model } from "objection";
import Knex from "knex";

const knex = Knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
  },
});

Model.knex(knex);
