const express = require("express");
const app = express();
const route = require("./routers/forwards/addbefore.js");
const route1 = require("./routers/nexts/addAfter.js");
const route2 = require("./routers/forwards/showBefore");
const route3 = require("./routers/nexts/showAfter.js");
const route4 = require("./routers/productApi.js");
const route5 = require("./routers/userApi.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 7001;

app.use("/porcelain/addOperator/beforeAdd", route);
app.use("/porcelain/addOperator/afterAdd", route1);
app.use("/porcelain/showWithTokenBefore", route2);
app.use("/porcelain/showWithTokenAfter", route3);
app.use("/porcelain/products", route4);
app.use("/porcelain/addUser", route5);
app.listen(port, () => {
  console.log(`${port} ni eshitishni boshladim`);
});
