const { carService } = require("../../../services");

exports.createCar = async (req, res) => {
  try {
    const { name, price, size, available } = req.body;
    const image = req.image; //from cloudinary middleware
    const userId = req.user.id; //from authorize
    const carPayload = await carService.createCar(
      name,
      price,
      size,
      image,
      available,
      userId
    );

    res.status(200).json({
      status: "OK",
      message: "Success",
      data: carPayload,
    });
  } catch (error) {
    res.status(404).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.getAllCar = async (req, res) => {
  try {
    const carPayload = await carService.getAllCar();
    res.status(200).json({
      status: "OK",
      message: "Success",
      data: carPayload,
    });
  } catch (error) {
    res.status(404).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.getCar = async (req, res) => {
  try {
    const car = req.car;
    res.status(200).json({
      status: "OK",
      message: "Success",
      data: car,
    });
  } catch (error) {
    res.status(404).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = req.car;
    await carService.deleteCar(car.id);
    res.status(200).json({
      status: "OK",
      message: "Success",
    });
  } catch (error) {
    res.status(404).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = req.car;
    const userId = req.user.id;
    const carPayload = req.body;
    const image = req.image || car.image;
    //Template obj data
    const uploadPayload = {
      name: carPayload.name || car.name,
      price: Number(carPayload.price) || car.price,
      size: carPayload.size || car.size,
      image,
      available: Boolean(carPayload.available) || car.available,
      historyId: car.historyId,
    };
    await carService.updateCar(car.id, uploadPayload, userId);
    res.status(200).json({
      status: "OK",
      message: "Success",
      data: uploadPayload,
    });
  } catch (error) {
    res.status(404).json({
      status: "FAIL",
      message: err.message,
    });
  }
};
