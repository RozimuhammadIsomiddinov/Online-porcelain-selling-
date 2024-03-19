const mongoose = require("mongoose");
const Joi = require("joi");
const getSalt = require("../hash");

mongoose
  .connect("mongodb://localhost/Porcelain")
  .then(() => {
    console.log(`Mongodbga ulanish hosil qilindi\tAdmin uchun`);
  })
  .catch((err) => {
    console.log("ulanishda xatolik yuz berdi");
  });
const adminSchema = new mongoose.Schema({
  admin: {
    type: Boolean,
    required: false,
  },
  login: {
    type: String,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
});
const Admin = mongoose.model("Admin", adminSchema);

async function newAdd() {
  const newAdmin = new Admin({
    admin: true,
    login: "jo'ra.qodirov",
    password: "1992",
  });
  newAdmin.password = await getSalt(newAdmin.password);
  await newAdmin.save();
}

function validAdmin(value) {
  const valid = Joi.object({
    admin: Joi.boolean(),
    login: Joi.string().required().min(3),
    password: Joi.string().required().min(4),
  });
  return valid.validate(value);
}
async function finder(login) {
  const finded = await Admin.find({ login });
  return finded[0];
}

module.exports = {
  Admin,
  validAdmin,
  finder,
};
