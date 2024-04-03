const {
  validateProducts,
  finderProducts,
  addProduct,
} = require("../../connectToDB/products");

module.exports = async (req, res, next) => {
  try {
    const { error } = validateProducts(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const returnArr = await finderProducts(req.body.propertys);
    if (returnArr.length > 0)
      return res
        .status(400)
        .send("The product you are adding is available in Database!!!");

    const saved = await addProduct(req.body);
    res.status(200).send("Successfully add a product\n" + saved);
    next();
  } catch (er) {
    return res.status(400).send("Error");
  }
};
