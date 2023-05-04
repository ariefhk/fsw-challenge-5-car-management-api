const { authService } = require("../../../services");

exports.whoAmI = async (req, res) => {
  try {
    const bearerToken = req.headers.authorization;
    const payload = await authService.authorize(bearerToken);
    res.status(200).json(payload);
  } catch (err) {
    res.status(err.statusCode || 404).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await authService.login(email, password);
    res.status(201).json({
      status: "OK",
      message: "Success",
      token: user.token,
    });
  } catch (err) {
    res.status(err.statusCode || 404).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const user = await authService.register(name, email, password);
    res.status(201).json({
      status: "OK",
      message: "Success",
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(err.statusCode || 404).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const user = await authService.registerAdmin(name, email, password);
    res.status(201).json({
      status: "OK",
      message: "Success",
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(err.statusCode || 404).json({
      status: "FAIL",
      message: err.message,
    });
  }
};