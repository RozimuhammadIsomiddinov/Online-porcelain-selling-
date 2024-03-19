const express = require("express");
const route = express.Router();
const { checker } = require("../../middlewares/checkers/checkerAdmin.js");
const { genToken } = require("../../middlewares/forTokens/generateToken.js");

module.exports = route.get("/", checker, genToken);
