"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Job extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  apply() {
    return this.hasMany("App/Models/JobApply");
  }
}

module.exports = Job;
