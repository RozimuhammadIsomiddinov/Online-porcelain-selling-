const jwt = require("jsonwebtoken");
async function checkerTokenOper(req, res, next) {
  const token = req.header("x-operator-token");
  if (!token)
    return res
      .status(400)
      .send("Mavjud bo'lmagan token orqali kirish mumkin emas!!!");
  try {
    const decoded = jwt.verify(token, req.body.password);
    req.user = decoded;
    next();
  } catch (er) {
    return res.status(401).send(er.message + "\nchecker Tokendagi xato    ");
  }
}
module.exports = {
  checkerTokenOper,
};
