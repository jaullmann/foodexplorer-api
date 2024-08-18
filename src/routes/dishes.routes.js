const { Router } = require("express");
const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:dish_id", dishesController.show);
dishesRoutes.post("/", verifyUserAuthorization("admin"), dishesController.create);
dishesRoutes.put("/:dish_id", verifyUserAuthorization("admin"), dishesController.update);
dishesRoutes.delete("/:dish_id", verifyUserAuthorization("admin"), dishesController.delete);

module.exports = dishesRoutes;