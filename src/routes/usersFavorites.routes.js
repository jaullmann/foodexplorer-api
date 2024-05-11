const { Router } = require("express");
const UserFavoritesController = require("../controllers/UsersFavoritesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersFavoritesRoutes = Router();

const userFavoritesController = new UserFavoritesController();

usersFavoritesRoutes.use(ensureAuthenticated);

usersFavoritesRoutes.get("/", userFavoritesController.index);
usersFavoritesRoutes.post("/", userFavoritesController.create);
usersFavoritesRoutes.put("/", userFavoritesController.update);
usersFavoritesRoutes.delete("/", userFavoritesController.delete);

module.exports = usersFavoritesRoutes;