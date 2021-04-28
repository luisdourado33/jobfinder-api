"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.post("/login", "UserController.login");
Route.resource("/users", "UserController");
Route.post("/upload/:user_id", "UserController.upload");
Route.get("/download/:user_id", "UserController.download");
Route.resource("/roles", "RoleController");
Route.resource("/jobs", "JobController");
Route.post("/jobs/userJobs", "JobController.getUserJobs");
Route.resource("/jobs/jobApply", "JobApplyController");
Route.resource("/jobsApplies", "JobApplyController");
Route.get("/jobsApplies/filter/:id", "JobApplyController.appliesFromJob");
Route.resource("/companies", "CompanyTypeController");

// Rotas agrupadas no middleware de autenticação
// Route.group(() => {

// }).middleware('auth');
