const { Router } = require("express");
const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/:dish_id", dishesController.show);
dishesRoutes.put("/:dish_id", dishesController.update);
dishesRoutes.delete("/:dish_id", dishesController.delete);

module.exports = dishesRoutes;