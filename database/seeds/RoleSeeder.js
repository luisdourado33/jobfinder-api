"use strict";

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class RoleSeeder {
  async run() {
    Factory.blueprint("App/Models/Role", (fake) => {
      return {
        name: "Autônomo",
      };
    });

    await Factory.model("App/Models/Role").create(1);
  }
}

module.exports = RoleSeeder;
