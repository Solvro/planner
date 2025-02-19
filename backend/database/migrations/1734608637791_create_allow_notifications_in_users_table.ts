import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable("users", (table) => {
      table.boolean("allow_notifications").defaultTo(false);
    });
  }
}
