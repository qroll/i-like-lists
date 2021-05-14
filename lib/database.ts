import { Model } from "objection";
import Knex from "knex";

const knex = Knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT as string),
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    ssl:
      process.env.DATABASE_SSL === "true"
        ? {
            rejectUnauthorized: process.env.DATABASE_TLS_REJECT_UNAUTHORIZED === "true",
            ca: process.env.DATABASE_CERT,
          }
        : false,
  },
});

Model.knex(knex);
