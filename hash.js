const bcrypt = require("bcrypt");

module.exports = async function getSalt(password) {
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};
