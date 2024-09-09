const AppError = require("./app.error");

class ForbiddenError extends AppError {
  constructor(message = "Permission error!") {
    super(message, 403);
  }
}

module.exports = ForbiddenError;
