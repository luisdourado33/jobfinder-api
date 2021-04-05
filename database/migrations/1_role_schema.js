'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleSchema extends Schema {
  up () {
    this.create('roles', (table) => {
      table.increments();
      table.string("name", 255);
      table.boolean("status").defaultTo(1);
      table.timestamps();
    })
  }

  down () {
    this.drop('roles')
  }
}

module.exports = RoleSchema
