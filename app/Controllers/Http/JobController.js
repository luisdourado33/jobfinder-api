"use strict";

const Database = use("Database");
const Job = use("App/Models/Job");
const JobApply = use("App/Models/JobApply");
const User = use("App/Models/User");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with jobs
 */
class JobController {
  /**
   * Show a list of all jobs.
   * GET jobs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const jobs = await Job.query()
      .with("user")
      .orderBy("created_at", "desc")
      .fetch();
    return jobs;
  }

  /**
   * Create/save a new job.
   * POST jobs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async store({ request, response }) {
    let { user_id } = request.all();

    const data = request.only([
      "user_id",
      "title",
      "description",
      "period",
      "location",
    ]);

    const job = await Job.create(data);

    async function incrementJobOwner() {
      await Database.table("users")
        .where("id", user_id)
        .increment("jobsCreated", 1);
    }

    incrementJobOwner();

    return job;
  }

  /**
   * Display a single job.
   * GET jobs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const job = await Job.query().with("user").where("id", params.id).fetch();
    return job;
  }

  /**
   * Update job details.
   * PUT or PATCH jobs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a job with id.
   * DELETE jobs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    let job = await Job.find(params.id);

    await job.delete();
    return { msg: `Vaga ${params.id} removida com sucesso` };
  }

  async getUserJobs({ params, request, response, auth }) {
    const { userId } = request.all();

    const userJobs = await Job.query()
      .with("user")
      .where("user_id", userId)
      .orderBy("created_at", "desc")
      .fetch();

    return userJobs;
  }
}

module.exports = JobController;
