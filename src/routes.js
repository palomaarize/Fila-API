const routes = require("express").Router();
const { router } = require("./app");
 const { User } = require("./app/models");
const UserController = require("./app/controllers/UserController");

routes.post("/createUser", UserController.store);
routes.put("/addToLine/:id", UserController.queueRefresh);
routes.get("/findPosition/:email", UserController.searchByEmail);
routes.get("/showLine", UserController.showLineInOrder);
routes.get("/filterLines/gender/:gender", UserController.queueParameterGender);
routes.get("/filterLines/name/:name", UserController.queueParameterName);
routes.get("/filterLines/email/:email", UserController.queueParameterEmail);
routes.put("/popLine", UserController.queueDelete);

module.exports = routes;
