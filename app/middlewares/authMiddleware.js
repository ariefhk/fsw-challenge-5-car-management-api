const { authService } = require("../services");
const { ACCESS_CONTROL } = require("../../config/application");

exports.authorize = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const payload = await authService.authorize(bearerToken);
    if (!bearerToken) throw new Error("required authorization");
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({
      error: {
        name: err.name,
        message: err.message,
      },
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (
      ACCESS_CONTROL.SUPERADMIN === user.roleId ||
      ACCESS_CONTROL.ADMIN === user.roleId
    ) {
      return next();
    }
    throw new Error("You don't have permission to access this page");
  } catch (err) {
    res.status(401).json({
      error: {
        name: err.name,
        message: "You don't have permission to access this page",
      },
    });
  }
};

exports.isSuperAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (ACCESS_CONTROL.SUPERADMIN !== user.roleId)
      throw new Error("You don't have permission to access this page");

    next();
  } catch (err) {
    res.status(401).json({
      error: {
        name: err.name,
        message: "You don't have permission to access this page",
      },
    });
  }
};
