const { finderProducts, clener } = require("../../connectToDB/products");

module.exports = async (req, res, next) => {
  try {
    const willBeDeleted = await finderProducts(req.body.propertys);
    if (willBeDeleted.length == 0)
      return res.status(400).send("The product not Found");

    await clener(req.body.propertys); //returns
    res.status(200).send("Successful deletion");
    next();
  } catch (er) {
    return res.status(400).send(er.message);
  }
};
