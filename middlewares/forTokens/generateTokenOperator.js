const jwt = require("jsonwebtoken");
const { finderOperator } = require("../../connectToDB/operators");
async function genToken(req, res, next) {
  try {
    const user = await finderOperator(req.body.login);
    const token = jwt.sign({ id: user._id }, req.body.password, {
      expiresIn: "24m",
    });
    res.header("x-operator-token", token).send(true + "\n" + token);
    next();
  } catch (err) {
    res.send(err.message + "\ngeneratsiyadagi xato");
  }
}

module.exports = {
  genToken,
};
