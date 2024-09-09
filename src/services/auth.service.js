const User = require("../database/models/user.model");
const { AppError } = require("../errors");
const bcrypt = require("bcryptjs");
const jwtUtil = require("../utils/jwt.util");

const authService = {
  register: async (body) => {
    const checkExists = await User.findOne({
      $or: [{ email: body.email }, { username: body.username }],
    });

    if (checkExists)
      throw new AppError("Email or username is already exists", 409);
    const user = await User.create({
      ...body,
      confirmPassword: undefined,
    });

    return {
      user,
    };
  },
  login: async (body) => {
    const user = await User.findOne({ email: body.email });
    let checkPassword;
    if (user)
      checkPassword = await bcrypt.compare(body.password, user.password);
    if (!user || !checkPassword)
      throw new AppError("Invalid username/email or password.", 401);

    const token = jwtUtil.encode({ userId: user._id });
    return { token };
  },
};

module.exports = authService;
