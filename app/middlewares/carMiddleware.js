const { carService } = require("../services");

exports.checkCar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const carPayload = await carService.getCarById(id);

    if (!carPayload) {
      res.status(404).json({
        error: "Car not found!",
      });

      return;
    }

    req.car = carPayload;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Error!",
      err_msg: error.message,
    });
  }
};
