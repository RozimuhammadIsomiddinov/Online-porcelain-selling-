const { Operator } = require("../connectToDB/operators");

async function show(req, res, next) {
  try {
    res.send(await Operator.find().select({ _id: 0, __v: 0, operator: 0 }));
    next();
  } catch (er) {
    return res.status(400).send(er.message);
  }
}

module.exports = {
  show,
};
