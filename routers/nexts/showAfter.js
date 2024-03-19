const express = require("express");
const route = express.Router();
const { checkerToken } = require("../../middlewares/checkers/checkerToken");
const { show } = require("../../middlewares/showOperators");

module.exports = route.get("/", checkerToken, show);
