const bcrypt = require("bcrypt");
const { validAdmin, finder } = require("../../connectToDB/admin");

async function checker(req, res, next) {
  try {
    const { error } = validAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const login = req.body.login;
    const newPassword = req.body.password;

    const returned = await finder(login);
    if (!returned) return res.status(404).send(false);

    const isValid = await bcrypt.compare(newPassword, returned.password);
    if (!isValid)
      return res.status(400).send("Login or password is incorrect.");

    if (!returned.admin)
      return res
        .status(400)
        .send("Siz admin emassiz va bu malumotlarni ko'rolmaysiz");

    next();
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
module.exports = { checker };
