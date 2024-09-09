const User = require("../database/models/user.model");
const { AppError, UnauthorizedError } = require("../errors");
const ForbiddenError = require("../errors/forbidden.error");
const jwtUtil = require("../utils/jwt.util");

const authMiddleware = (role = null) => {
  return async (req, res, next) => {
    let token = req.headers.authorization || "";
    token = token.split(" ")[1];

    let payload;
    try {
      payload = jwtUtil.decode(token);
      if (!payload) {
        throw new UnauthorizedError();
      }
    } catch (error) {
      next(new UnauthorizedError());
    }

    if (payload) {
      const { userId } = payload;

      const user = await User.findById(userId);

      if (!user) throw new UnauthorizedError();
      if ((role && user.role == role) || role == "user/admin") {
        req.user = user;
        next();
      } else if (role && user.role !== role) throw new ForbiddenError();
    }
  };
};

module.exports = authMiddleware;
