import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user", function (table) {
    table.uuid("id").notNullable();
    table.string("username", 255).notNullable().unique();
    table.string("password", 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user");
}
