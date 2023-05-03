const { carRepository, historyRepository } = require("../repositories");

exports.createCar = async (name, price, size, image, available, userId) => {
  const createHistory = await historyRepository.createdBy(userId);
  const historyId = createHistory.id;
  const car = {
    name,
    price: Number(price),
    size,
    image,
    available: Boolean(available),
    historyId,
  };
  return await carRepository.createCar(car);
};

exports.getCarById = async (id) => {
  return await carRepository.getCarById(id);
};

exports.getAllCar = async () => {
  return await carRepository.getCar();
};

exports.deleteCar = async (id) => {
  return await carRepository.deleteCar(id);
};

exports.updateCar = async (carId, updateArgs, userId) => {
  const historyId = updateArgs.historyId;
  await historyRepository.updatedBy(userId, historyId);
  return await carRepository.updateCar(carId, updateArgs);
};
