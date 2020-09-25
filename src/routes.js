const routes = require("express").Router();
const { router } = require("./app");
 const { User } = require("./app/models");
const UserController = require("./app/controllers/UserController");

routes.post("/createUser", UserController.store);
routes.put("/addToLine/:id", UserController.queueRefresh);

module.exports = routes;
