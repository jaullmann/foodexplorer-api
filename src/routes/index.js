const { Router } = require("express");

const sessionsRouter = require("./sessions.routes");
const usersRouter = require("./users.routes");

// const salesRouter = require("./sales.routes");
// const productsRouter = require("./products.routes");

const routes = Router();

routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);

// routes.use("/sales", salesRouter);
// routes.use("/products", productsRouter);

module.exports = routes;