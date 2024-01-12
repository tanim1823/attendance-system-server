const morgan = require("morgan");
const cors = require("cors");
const express = require("express");

const middleware = [morgan("dev"), cors(), express.json()];

module.exports = middleware;
