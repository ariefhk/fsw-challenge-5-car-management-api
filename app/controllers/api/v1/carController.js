const { carService } = require("../../../services");

exports.createCar = async (req, res) => {
  try {
    const { name, price, size, available } = req.body;
    const image = req.image; //from cloudinary middleware
    const createdBy = req.user.id; //from authorize
    const carPayload = await carService.createCar(
      name,
      price,
      size,
      image,
      available,
      createdBy
    );

    res.status(200).json({
      status: "OK",
      message: "Success",
      data: carPayload,
    });
  } catch (err) {
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
  } catch (err) {
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
  } catch (err) {
    res.status(404).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = req.car;
    const deletedBy = req.user.id;
    await carService.deleteCar(car.id, deletedBy);
    res.status(200).json({
      status: "OK",
      message: "Success",
    });
  } catch (err) {
    res.status(404).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = req.car;
    const updatedBy = req.user.id;
    const carPayload = req.body;
    const image = req.image || car.image;
    //Template obj data
    const uploadPayload = {
      name: carPayload.name || car.name,
      price: carPayload.price || car.price,
      size: carPayload.size || car.size,
      image,
      available: carPayload.available || car.available,
      updatedBy,
    };
    await carService.updateCar(car.id, uploadPayload);
    res.status(200).json({
      status: "OK",
      message: "Success",
      data: uploadPayload,
    });
  } catch (err) {
    res.status(404).json({
      status: "FAIL",
      message: err.message,
    });
  }
};
