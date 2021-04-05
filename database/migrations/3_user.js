'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments();
      table.integer("role_id").unsigned().references("id").inTable("roles");
      table.integer("company_types_id").unsigned().references("id").inTable("company_types");
      table.string("username", 80).notNullable().unique();
      table.string("email", 254).notNullable().unique();
      table.string("password", 60).notNullable();
      table.string("cpf", 254);
      table.string("cnpj", 254);
      table.integer("access");
      table.integer("jobsCreated");
      table.integer("jobsSigned");
      table.boolean("status").defaultTo(1);
      table.timestamps();
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
