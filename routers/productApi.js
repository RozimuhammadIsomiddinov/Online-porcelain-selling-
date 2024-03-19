const express = require("express");
const route = express.Router();
const postPro = require("../middlewares/productApi/postProduct.js");
const getPro = require("../middlewares/productApi/getProduct.js");
const deletePro = require("../middlewares/productApi/deletePro");
const { checkerOperator } = require("../middlewares/checkers/checkerOperator");
const {
  genToken,
} = require("../middlewares/forTokens/generateTokenOperator.js");
const {
  checkerTokenOper,
} = require("../middlewares/checkers/checkerTokenOperators.js");

route
  .get("/", getPro)
  .post("/auth", checkerOperator, genToken)
  .post("/check", checkerTokenOper)
  .post("/add", postPro)

  .delete("/authDelete", checkerOperator)
  .delete("/delete", deletePro);
module.exports = route;
