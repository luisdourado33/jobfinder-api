'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobSchema extends Schema {
  up () {
    this.create('jobs', (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table.string("title", 255);
      table.text("description", "longtext");
      table.string("period", 60);
      table.text("location", 255);
      table.timestamps();
    })
  }

  down () {
    this.drop('jobs')
  }
}

module.exports = JobSchema
