const { Router } = require("express");
const UsersFavoritesController = require("../controllers/UsersFavoritesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const usersFavoritesRoutes = Router();

const usersFavoritesController = new UsersFavoritesController();

usersFavoritesRoutes.use(ensureAuthenticated);
usersFavoritesRoutes.use(verifyUserAuthorization(["admin", "customer"]));

usersFavoritesRoutes.get("/", usersFavoritesController.show);
usersFavoritesRoutes.post("/", usersFavoritesController.create);
usersFavoritesRoutes.put("/", usersFavoritesController.update);
usersFavoritesRoutes.delete("/", usersFavoritesController.delete);

module.exports = usersFavoritesRoutes;