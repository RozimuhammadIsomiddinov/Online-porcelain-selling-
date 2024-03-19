const mongoose = require("mongoose");
const Joi = require("joi");
const getSalt = require("../hash");

mongoose
  .connect("mongodb://localhost/Porcelain")
  .then(() => {
    console.log(`Mongodbga ulanish hosil qilindi\tOperator uchun`);
  })
  .catch((err) => {
    console.log("ulanishda xatolik yuz berdi");
  });
const opretorsSchema = new mongoose.Schema({
  operator: { type: Boolean, required: false },
  login: {
    type: String,
    minlength: 3,
    required: true,
  },
  password: { required: true, type: String, minlength: 4 },
});
const Operator = mongoose.model("Operators", opretorsSchema);

function validOperator(value) {
  const schema = Joi.object({
    operator: Joi.boolean(),
    login: Joi.string().min(3).required(),
    password: Joi.string().min(4).required(),
  });

  return schema.validate(value);
}
async function finderOperator(login) {
  const finded = await Operator.find({ login });
  return finded;
}
async function newOperator(val) {
  const newOper = new Operator({
    operator: true,
    login: val.login,
    password: val.password,
  });
  newOper.password = await getSalt(newOper.password);
  return await newOper.save();
}
module.exports = {
  Operator,
  validOperator,
  finderOperator,
  newOperator,
};
