const { carService } = require("../services");

exports.checkCar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const carPayload = await carService.getCarById(id);

    if (!carPayload) {
      res.status(404).json({
        status: "FAIL",
        message: `car not found!`,
      });
      return;
    }

    req.car = carPayload;

    next();
  } catch (err) {
    res.status(500).json({
      status: "FAIL",
      message: "server error!",
    });
  }
};
