const express = require("express");
const route = express.Router();
const { genToken } = require("../../middlewares/forTokens/generateToken");

module.exports = route.post("/", genToken);
