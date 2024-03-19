const express = require("express");
const route = express.Router();
const { addUsers } = require("../middlewares/addUser");

route.post("/api", addUsers);
module.exports = route;
