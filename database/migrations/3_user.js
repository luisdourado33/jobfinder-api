"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

/**
 * Níveis de Acesso
 * 1 - Usuário
 * 2 - Empresa
 * 3 - Administrador
 */
class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.integer("role_id").unsigned().references("id").inTable("roles");
      table
        .integer("company_types_id")
        .unsigned()
        .references("id")
        .inTable("company_types");
      table.string("username", 80).notNullable();
      table.string("email", 254).notNullable().unique();
      table.string("password", 60).notNullable();
      table.string("cpf", 254);
      table.string("cnpj", 254).defaultTo("");
      table.integer("access").defaultTo(1);
      table.date("birthDate");
      table.integer("jobsCreated").defaultTo(0);
      table.integer("jobsSigned").defaultTo(0);
      table.boolean("status").defaultTo(1);
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
