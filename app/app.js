const express = require("express");
const middleware = require("./middleware");
const { notFoundHandler, errorHandler } = require("./error");
const routes = require("./routes");

const app = express();

/** Public Static Folder */
app.use("/static", express.static("public"));

/** Middlewares */
app.use(middleware);
app.use(routes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
