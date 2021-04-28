"use strict";
const Drive = use("Drive");
const Helpers = use("Helpers");
const User = use("App/Models/User");
const Role = use("App/Models/Role");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    let users = await User.query().with("roles").fetch();
    return users;
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only([
      "role_id",
      "company_types_id",
      "username",
      "birthDate",
      "email",
      "password",
      "cpf",
    ]);

    const user = await User.create(data);

    return user;
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    let user = await User.query().where("id", params.id).with("roles").fetch();
    return user;
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    let user = await User.find(params.id);

    await user.delete();
    return { msg: `Usuário ${params.id} removido com sucesso` };
  }

  /**
   * Sign in to account through email and password.
   * POST login/{form.body}
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async login({ params, request, response, auth }) {
    const { email, password } = request.all();

    let token = await auth.attempt(email, password);
    let user = await User.query().where("email", email).fetch();

    return { user, token };
  }

  async upload({ params, request }) {
    const user_id = params.user_id;
    const curriculum = request.file("curriculum", {
      types: ["document", "pdf", "image"],
      size: "10mb",
    });

    await curriculum.move(Helpers.tmpPath("uploads"), {
      name: `curriculo_user_${user_id}.pdf`,
      overwrite: true,
    });

    if (!curriculum.moved()) {
      return curriculum.error();
    }

    return {
      status: true,
      msg: `Currículo do usuário ${user_id} atualizado com sucesso`,
    };
  }

  async download({ params, request, response }) {
    const user_id = params.user_id;

    if (await Drive.exists(`uploads/curriculo_user_${user_id}.pdf`)) {
      response.header("Content-type", "application/pdf");
      return await Drive.get(`uploads/curriculo_user_${user_id}.pdf`);
    } else {
      return {
        status: false,
        msg: "Não foi encontrado nenhuma ocorrência para este identificador.",
      };
    }
  }
}

module.exports = UserController;
