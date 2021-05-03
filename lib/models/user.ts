import { Model } from "objection";

class User extends Model {
  id!: string;
  username!: string;

  static get tableName() {
    return "user";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "string" },
        username: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

export default User;
