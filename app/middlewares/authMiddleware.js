const { authService } = require("../services");
const ApplicationError = require("../errors/ApplicationError");
const { ACCESS_CONTROL } = require("../../config/application");

exports.authorize = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken)
      throw new ApplicationError(400, "required authorization!");
    const payload = await authService.authorize(bearerToken);
    req.user = payload;
    next();
  } catch (err) {
    res.status(err.statusCode).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (
      ACCESS_CONTROL.SUPERADMIN === user.role ||
      ACCESS_CONTROL.ADMIN === user.role
    ) {
      return next();
    }
    throw new ApplicationError(400, "You don't have permission to access!");
  } catch (err) {
    res.status(err.statusCode).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.isSuperAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (ACCESS_CONTROL.SUPERADMIN !== user.role)
      throw new ApplicationError(400, "You don't have permission to access!");

    next();
  } catch (err) {
    res.status(err.statusCode).json({
      status: "FAIL",
      message: err.message,
    });
  }
};
