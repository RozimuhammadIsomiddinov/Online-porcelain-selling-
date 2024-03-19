const { finderProducts, clener } = require("../../connectToDB/products");

module.exports = async (req, res, next) => {
  try {
    const willBeDeleted = await finderProducts(req.body.propertys);
    if (willBeDeleted.length == 0)
      return res
        .status(400)
        .send("Siz o'chirmoqchi bo'lgan mahsulot mavjud emas");

    await clener(req.body.propertys); //returns
    res.status(200).send("Muvaffaqqiyatli o'chirish");
    next();
  } catch (er) {
    return res.status(400).send(er.message);
  }
};
