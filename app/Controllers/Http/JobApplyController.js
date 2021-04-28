"use strict";

const Database = use("Database");
const JobApply = use("App/Models/JobApply");
const Job = use("App/Models/Job");
const User = use("App/Models/User");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with jobapplies
 */
class JobApplyController {
  /**
   * Show a list of all jobapplies.
   * GET jobapplies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const allApplies = await JobApply.query().with("job").fetch();

    return allApplies;
  }

  /**
   * Render a form to be used for creating a new jobapply.
   * GET jobapplies/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new jobapply.
   * POST jobapplies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { user_id, job_id } = request.all();
    const data = request.only(["user_id", "job_id"]);

    const apply = await JobApply.create(data);

    if (apply) {
      // Increment jobs signed of an user.
      await Database.table("users")
        .where("id", user_id)
        .increment("jobsSigned", 1);

      // Increment applies on Job
      await Database.table("jobs").where("id", job_id).increment("applies", 1);
    }

    return apply;
  }

  /**
   * Display a single jobapply.
   * GET jobapplies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    let foo = await Database.select("*")
      .from("jobs")
      .join("job_applies", "jobs.id", "job_applies.job_id")
      .where("job_applies.user_id", params.id);

    return foo;
  }

  async appliesFromJob({ params, request, response }) {
    const allApplies = await JobApply.query()
      // .with("job")
      .with("user")
      .where("job_id", params.id)
      .fetch();
    return allApplies;
  }
  /**
   * Render a form to update an existing jobapply.
   * GET jobapplies/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update jobapply details.
   * PUT or PATCH jobapplies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a jobapply with id.
   * DELETE jobapplies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = JobApplyController;
