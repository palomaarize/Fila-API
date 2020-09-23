const routes = require("express").Router();
// const { User } = require("./app/models");
const CreateUserController = require("./app/models/controllers/CreateUserController");

routes.post("/createUser", CreateUserController.store);

module.exports = routes;
