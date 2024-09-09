const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 15,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: { type: String, required: true, minLength: 8 },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user', 
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = model("user", userSchema);
module.exports = User;
