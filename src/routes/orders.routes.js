const { Router } = require("express");
const OrdersController = require("../controllers/OrdersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.get("/", ordersController.index);
ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/:order_id", ordersController.show);
ordersRoutes.put("/:order_id", ordersController.update);
ordersRoutes.delete("/:order_id", ordersController.delete);

module.exports = ordersRoutes;