const jwt = require("jsonwebtoken");
async function checkerTokenOper(req, res, next) {
  const token = req.header("x-operator-token");
  if (!token) return res.status(400).send("Token not Found!!!");
  try {
    const decoded = jwt.verify(token, req.body.password);
    req.user = decoded;
    next();
  } catch (er) {
    return console.log(er.message + "\ninvalid token in Operators");
  }
}
module.exports = {
  checkerTokenOper,
};
