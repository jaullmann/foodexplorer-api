const { Router } = require("express");

const sessionsRouter = require("./sessions.routes");
const usersRouter = require("./users.routes");
const dishesRouter = require("./dishes.routes");
const ordersRouter = require("./orders.routes");
const userFavoritesRouter = require("./userFavorites.routes");

const routes = Router();

routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);
routes.use("/dishes", dishesRouter);
routes.use("/orders", ordersRouter);
routes.use("/favorites", userFavoritesRouter);

module.exports = routes;