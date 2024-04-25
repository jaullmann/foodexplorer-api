const { Router } = require("express");

const sessionsRouter = require("./sessions.routes");
const usersRouter = require("./users.routes");
const dishesRouter = require("./dishes.routes");

// const salesRouter = require("./sales.routes");

const routes = Router();

routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);
routes.use("/dishes", dishesRouter);
// routes.use("/sales", salesRouter);

module.exports = routes;