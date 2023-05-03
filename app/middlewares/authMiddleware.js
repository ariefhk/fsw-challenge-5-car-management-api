const { authService } = require("../services");
const { ACCESS_CONTROL } = require("../../config/application");

exports.authorize = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const payload = await authService.authorize(bearerToken);

    if (!bearerToken)
      // throw new InsufficientAccessError(payload?.role?.name);
      throw new Error("User ga jelas");

    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({
      error: {
        name: err.name,
        message: err.message,
        details: err.details || null,
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
    // throw new InsufficientAccessError(payload?.role?.name);
    throw new Error("User ga jelas buat tambah data");
  } catch (err) {
    res.status(401).json({
      error: {
        name: err.name,
        message: err.message,
        details: err.details || null,
      },
    });
  }
};

exports.isSuperAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (ACCESS_CONTROL.SUPERADMIN !== user.roleId)
      // throw new InsufficientAccessError(payload?.role?.name);
      throw new Error("User ga jelas");

    next();
  } catch (err) {
    res.status(401).json({
      error: {
        name: err.name,
        message: err.message,
        details: err.details || null,
      },
    });
  }
};
