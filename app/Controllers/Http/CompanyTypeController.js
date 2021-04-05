"use strict";

const CompanyType = use("App/Models/CompanyType");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with companytypes
 */
class CompanyTypeController {
  /**
   * Show a list of all companytypes.
   * GET companytypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const types = await CompanyType.all();

    return types;
  }

  /**
   * Create/save a new companytype.
   * POST companytypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(["name", "status"]);
    const type = await CompanyType.create(data);

    return type;
  }

  /**
   * Display a single companytype.
   * GET companytypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    let type = await CompanyType.find(params.id);

    return type;
  }

  /**
   * Update companytype details.
   * PUT or PATCH companytypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a companytype with id.
   * DELETE companytypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    let type = await CompanyType.find(params.id);

    await type.delete();
    return { msg: `Tipo de empresa ${params.id} removido com sucesso` };
  }
}

module.exports = CompanyTypeController;
