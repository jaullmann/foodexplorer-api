const { Router } = require("express");

const sessionsRouter = require("./sessions.routes");
const usersRouter = require("./users.routes");
const dishesRouter = require("./dishes.routes");
const cartsRouter = require("./usersCarts.routes");
const ordersRouter = require("./orders.routes");
const favoritesRouter = require("./favorites.routes");

const routes = Router();

routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);
routes.use("/dishes", dishesRouter);
routes.use("/cart", cartsRouter);
routes.use("/orders", ordersRouter);
routes.use("/favorites", favoritesRouter);

module.exports = routes;