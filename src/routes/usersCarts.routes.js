const { Router } = require("express");
const UsersCartsController = require("../controllers/UsersCartsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersCartsRoutes = Router();

const usersCartsController = new UsersCartsController();

usersCartsRoutes.use(ensureAuthenticated);

usersCartsRoutes.get("/", usersCartsController.index);
usersCartsRoutes.post("/", usersCartsController.create);
usersCartsRoutes.put("/", usersCartsController.update);
usersCartsRoutes.delete("/", usersCartsController.delete);

module.exports = usersCartsRoutes;