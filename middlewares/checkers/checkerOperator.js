const bcrypt = require("bcrypt");
const {
  validOperator,
  finderOperator,
} = require("../../connectToDB/operators");

async function checkerOperator(req, res, next) {
  try {
    const { error } = validOperator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const login = req.body.login;
    const newPassword = req.body.password;

    const returned = await finderOperator(login);
    if (returned.length == 0)
      return res
        .status(404)
        .send("You are not an operator and can't make a Request");

    const isValid = await bcrypt.compare(newPassword, returned[0].password);
    if (!isValid)
      return res.status(400).send("Login or password is incorrect.");

    next();
  } catch (err) {
    return res.status(501).send(err.message);
  }
}
module.exports = { checkerOperator };
