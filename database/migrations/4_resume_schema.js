'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResumeSchema extends Schema {
  up () {
    this.create('resumes', (table) => {
      table.increments();
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.boolean("status").defaultTo(1);
      table.timestamps();
    })
  }

  down () {
    this.drop('resumes')
  }
}

module.exports = ResumeSchema
