const { userService } = require("../../../services");

exports.whoAmI = async (req, res) => {
  try {
    const user = req.user; //from authorization userMiddleware
    res.status(200).json({
      status: "OK",
      message: "Success",
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(err.statusCode || 404).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const userPayload = await userService.getAllUser();
    res.status(200).json({
      status: "OK",
      message: "Success",
      data: userPayload,
    });
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
    const user = await userService.login(email, password);
    res.status(200).json({
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
    const user = await userService.register(name, email, password);
    res.status(201).json({
      status: "OK",
      message: "Success",
      data: {
        name: user.name,
        email: user.email,
      },
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
    const user = await userService.registerAdmin(name, email, password);
    res.status(201).json({
      status: "OK",
      message: "Success",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(err.statusCode || 404).json({
      status: "FAIL",
      message: err.message,
    });
  }
};
