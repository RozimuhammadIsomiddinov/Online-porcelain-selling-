const jwt = require("jsonwebtoken");
const { finder } = require("../../connectToDB/admin");
async function genToken(req, res, next) {
  try {
    const user = await finder("jo'ra.qodirov");
    const token = jwt.sign({ id: user._id }, req.body.password, {
      expiresIn: "240s",
    });
    res.header("x-admin-token", token).send(true + "\n" + token);
    next();
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  genToken,
};
