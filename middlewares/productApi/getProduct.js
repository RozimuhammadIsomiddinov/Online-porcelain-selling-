const { getProducts } = require("../../connectToDB/products");
module.exports = async (req, res, next) => {
  try {
    const gett = await getProducts();
    res.status(200).send(gett.length == 0 ? "No products available yet" : gett);
    next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
