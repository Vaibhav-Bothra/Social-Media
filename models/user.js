const mongoose = require("mongoose");

const db = require("../config/mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.pluralize(null);
const User = db.model("User", userSchema);

module.exports = User;
