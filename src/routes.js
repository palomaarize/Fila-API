const routes = require("express").Router();
// const { User } = require("./app/models");
const CreateUserController = require("./app/controllers/CreateUserController");

routes.post("/createUser", CreateUserController.store);

module.exports = routes;
