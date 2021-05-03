import { Model } from "objection";
import Knex from "knex";

const knex = Knex({
  client: "pg",
  connection: {
    host: "db",
    user: "app",
    password: "password",
    database: "i-like-lists",
  },
});

Model.knex(knex);
