const { validUser, addUser } = require("../connectToDB/user");
const { finderProSub } = require("../connectToDB/products");

async function addUsers(req, res, next) {
  try {
    const { error } = validUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const product = await finderProSub(req.body.subjectName);
    if (product.length == 0)
      return res.status(400).send("siz qidirgan mahsulot mavjud emas");

    const newUser = await addUser(req.body);
    res.send(newUser);
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  addUsers,
};
