const { carRepository } = require("../repositories");

exports.createCar = async (name, price, size, image, available, createdBy) => {
  const car = {
    name,
    price,
    size,
    image,
    available,
    createdBy,
  };
  return await carRepository.createCar(car);
};

exports.getCarById = async (id) => {
  return await carRepository.getCarById(id);
};

exports.getAllCar = async () => {
  return await carRepository.getCar();
};

exports.deleteCar = async (carId, deletedBy) => {
  await carRepository.updateCar(carId, { deletedBy });
  return await carRepository.deleteCar(carId);
};

exports.updateCar = async (carId, updateArgs) => {
  return await carRepository.updateCar(carId, updateArgs);
};
