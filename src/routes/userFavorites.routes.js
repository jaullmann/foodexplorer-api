const { Router } = require("express");
const UserFavoritesController = require("../controllers/UserFavoritesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userFavoritesRoutes = Router();

const userFavoritesController = new UserFavoritesController();

userFavoritesRoutes.use(ensureAuthenticated);

userFavoritesRoutes.get("/", userFavoritesController.index);
userFavoritesRoutes.post("/", userFavoritesController.create);
userFavoritesRoutes.get("/", userFavoritesController.show);
userFavoritesRoutes.put("/", userFavoritesController.update);
userFavoritesRoutes.delete("/", userFavoritesController.delete);

module.exports = userFavoritesRoutes;