const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: nanoid,
  },
  role: {
    type: String,
    default: "User",
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("user", userSchema);
