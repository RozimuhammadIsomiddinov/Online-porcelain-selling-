const mongoose = require("mongoose");
const Joi = require("joi");

mongoose
  .connect("mongodb://localhost/Porcelain")
  .then(() => {
    console.log(`Mongodbga ulanish hosil qilindi\tProduct uchun`);
  })
  .catch((err) => {
    console.log("ulanishda xatolik yuz berdi");
  });
const productsSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    maxlength: 200,
  },
  propertys: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  isCredit: {
    type: Boolean,
    required: true,
  },
  toCredit: {
    type: Number,
    required: function () {
      return this.isCredit;
    },
    enum: [3, 6, 9],
  },
});
const Product = mongoose.model("Product", productsSchema);

function validateProducts(val) {
  const valid = Joi.object({
    productName: Joi.string().required().max(200), //umumiy
    propertys: Joi.string().required(),
    cost: Joi.number().required(), //cost umumiy
    isCredit: Joi.boolean().required(), //umumiy
    toCredit: Joi.number()
      .when("isCredit", { is: true, then: Joi.required() })
      .valid(3, 6, 9),
  });
  return valid.validate(val);
}

async function finderProducts(property) {
  const finded = await Product.find({ propertys: property });
  return finded;
}
async function finderProSub(subject) {
  return await Product.find({ productName: subject }).select({
    propertys: 0,
    _id: 0,
    __v: 0,
  });
}

async function getProducts() {
  return await Product.find().select({ _id: 0, __v: 0 });
}
async function addProduct(pro) {
  const newProduct = new Product({
    productName: pro.productName,
    propertys: pro.propertys,
    cost: pro.cost,
    isCredit: pro.isCredit,
    toCredit: pro.isCredit ? pro.toCredit : undefined,
  });
  const saved = await newProduct.save();
  return saved;
}

async function clener(deletePro) {
  return await Product.deleteMany({ propertys: deletePro });
}
module.exports = {
  Product,
  productsSchema,
  validateProducts,
  finderProducts,
  finderProSub,
  getProducts,
  addProduct,
  clener,
};
