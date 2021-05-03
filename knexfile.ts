module.exports = {
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "app",
    password: "password",
    database: "i-like-lists",
  },
  migrations: {
    tableName: "knex_migrations",
    loadExtensions: [".ts"],
    extension: "ts",
  },
};

export {};
