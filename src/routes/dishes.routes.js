const { Router } = require("express");
const DishesContromdjava -version
ller = require("../controllers/DishesController");
const UsersValidatedController = require("../controllers/UsersValidatedController");

const usersRoutes = Router();

const usersController = new UsersController();
const usersValidatedController = new UsersValidatedController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", usersController.update);
usersRoutes.get("/validated", usersValidatedController.index);

module.exports = usersRoutes;