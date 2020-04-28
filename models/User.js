const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: string,
    required: true,
  },
  email: {
    type: string,
    required: true,
    unique: true,
  },
  password: {
    type: string,
    required: true,
  },
  //avatar connects profile image to email
  avatar: {
    type: string,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
