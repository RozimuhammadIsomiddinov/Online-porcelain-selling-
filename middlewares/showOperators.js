const { Operator } = require("../connectToDB/operators");

async function show(req, res, next) {
  res.send(await Operator.find().select({ _id: 0, __v: 0, operator: 0 }));
  next();
}

module.exports = {
  show,
};
