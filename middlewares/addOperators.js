const {
  validOperator,
  finderOperator,
  newOperator,
} = require("../connectToDB/operators");
async function addOperators(req, res, next) {
  try {
    const { error } = validOperator(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const returnOperator = await finderOperator(req.body.login);
    if (returnOperator.length > 0)
      return res.status(404).send("this operator is available in Database");

    const newAwait = await newOperator(req.body);
    res.send("Successfully added Operator\n" + newAwait);
    next();
  } catch (er) {
    return res.status(500).send(er.message);
  }
}
module.exports = {
  addOperators,
};
