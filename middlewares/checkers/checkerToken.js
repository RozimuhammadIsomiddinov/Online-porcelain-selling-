const jwt = require("jsonwebtoken");
async function checkerToken(req, res, next) {
  const token = req.header("x-admin-token");
  if (!token)
    return res
      .status(400)
      .send("Mavjud bo'lmagan token orqali kirish mumkin emas!!!");
  try {
    const decoded = jwt.verify(token, req.body.password);
    req.user = decoded;
    next();
  } catch (er) {
    return res.status(401).send(er.message);
  }
}
module.exports = {
  checkerToken,
};
