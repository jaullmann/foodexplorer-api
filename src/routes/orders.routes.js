const { Router } = require("express");
const OrdersController = require("../controllers/OrdersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const ordersRoutes = Router();

const ordersController = new OrdersController();

ordersRoutes.use(ensureAuthenticated);

ordersRoutes.get("/", verifyUserAuthorization(["admin", "customer"]), ordersController.index);
ordersRoutes.post("/", verifyUserAuthorization(["admin", "customer"]), ordersController.create);
ordersRoutes.get("/:order_id", verifyUserAuthorization(["admin", "customer"]), ordersController.show);
ordersRoutes.put("/:order_id", verifyUserAuthorization(["admin"]), ordersController.update);
ordersRoutes.delete("/:order_id", verifyUserAuthorization(["admin"]), ordersController.delete);

module.exports = ordersRoutes;