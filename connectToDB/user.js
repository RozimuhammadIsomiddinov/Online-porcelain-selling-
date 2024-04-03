const mongoose = require("mongoose");
const Joi = require("joi");

mongoose
  .connect("mongodb://localhost/Porcelain")
  .then(() => {
    console.log(`Created connection to mongodb\t for users`);
  })
  .catch((err) => {
    console.log("a connection error in users");
  });

const userSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true,
  },
  tellnumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\+[\d]+$/.test(v);
      },
      message: "Invalid tellnumber format",
    },
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  proCost: {
    type: Number,
    required: true,
  },
  isCreditPro: {
    type: Boolean,
    required: true,
  },
  toCreditPro: {
    type: Number,
    required: function () {
      return this.isCreditPro;
    },
    enum: [3, 6, 9],
  },
  payment: {
    type: Number,
    required: function () {
      return this.isCreditPro;
    },
  },
});

const User = mongoose.model("User", userSchema);

function validUser(val) {
  const valid = Joi.object({
    client: Joi.string().required(),
    tellnumber: Joi.string()
      .pattern(/^\+[\d]+$/)
      .required(),
    subjectName: Joi.string().required(),
    proCost: Joi.number().required(),
    isCreditPro: Joi.boolean().required(),
    toCreditPro: Joi.number()
      .when("isCreditPro", { is: true, then: Joi.required() })
      .valid(3, 6, 9),
    payment: Joi.number().when("toCreditPro", {
      is: true,
      then: Joi.required(),
    }),
  });
  return valid.validate(val);
}

async function finderUser(name) {
  const finded = await User.find({ client: name });
  return finded;
}

async function getUsers() {
  return await User.find().select({ _id: 0, __v: 0 });
}

async function addUser(value) {
  let newUser;
  if (value.isCreditPro !== "false") {
    console.log(typeof value.isCreditPro);
    const price = value.toCreditPro;
    if (price == 3) {
      newUser = new User({
        client: value.client,
        tellnumber: value.tellnumber,
        subjectName: value.subjectName,
        proCost: value.proCost,
        isCreditPro: value.isCreditPro,
        toCreditPro: price,
        payment: value.proCost / 9 + value.proCost / 3,
      });
    } else if (price == 9) {
      newUser = new User({
        client: value.client,
        tellnumber: value.tellnumber,
        subjectName: value.subjectName,
        proCost: value.proCost,
        isCreditPro: value.isCreditPro,
        toCreditPro: price,
        payment: value.proCost / 3 + value.proCost / 6,
      });
    } else {
      newUser = new User({
        client: value.client,
        tellnumber: value.tellnumber,
        subjectName: value.subjectName,
        proCost: value.proCost,
        isCreditPro: value.isCreditPro,
        toCreditPro: price,
        payment: value.proCost / 6 + value.proCost / 6,
      });
    }
  } else {
    newUser = new User({
      client: value.client,
      tellnumber: value.tellnumber,
      subjectName: value.subjectName,
      proCost: value.proCost,
      isCreditPro: value.isCreditPro,
      toCreditPro: undefined,
      payment: undefined,
    });
  }
  return await newUser.save();
}

module.exports = {
  User,
  validUser,
  finderUser,
  getUsers,
  addUser,
};
