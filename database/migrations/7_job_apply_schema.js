"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class JobApplySchema extends Schema {
  up() {
    this.create("job_applies", (table) => {
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.integer("job_id").unsigned().references("id").inTable("jobs");
      table.integer("status").defaultTo(1);
      table.timestamps();
    });
  }

  down() {
    this.drop("job_applies");
  }
}

module.exports = JobApplySchema;
