const { Router } = require("express");
const UsersCartsController = require("../controllers/UsersCartsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const usersCartsRoutes = Router(); 

const usersCartsController = new UsersCartsController();

usersCartsRoutes.use(ensureAuthenticated);
usersCartsRoutes.use(verifyUserAuthorization(["admin", "customer"]));

usersCartsRoutes.get("/", usersCartsController.index);
usersCartsRoutes.post("/", usersCartsController.create);
usersCartsRoutes.put("/", usersCartsController.update);
usersCartsRoutes.delete("/", usersCartsController.delete);

module.exports = usersCartsRoutes;