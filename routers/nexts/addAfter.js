const express = require("express");
const route = express.Router();
const { addOperators } = require("../../middlewares/addOperators.js");
const { checkerToken } = require("../../middlewares/checkers/checkerToken.js");

module.exports = route.post("/", checkerToken, addOperators);
