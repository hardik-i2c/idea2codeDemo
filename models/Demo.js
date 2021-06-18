const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
/*
    Here you can make multipal validation for particular one field
*/

const demoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      max: 255,
      min: 6,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    //   want to store createdAt and updatedAt
    timestamps: true,
  }
);

demoSchema.methods.generateAuthToken = function () {
  const demo = this;
  const token = jwt.sign({ _id: demo._id }, process.env.TOKEN_SECRET);
  return token;
};
demoSchema.methods.toJSON = function () {
  const demo = this;
  const demoObj = demo.toObject();
  delete demoObj.__v;
  delete demoObj.password;
  return demoObj;
};

module.exports = mongoose.model("demo", demoSchema);
