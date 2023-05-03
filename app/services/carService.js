const { carRepository, historyRepository } = require("../repositories");

exports.createCar = async (name, price, size, image, available, userId) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

exports.getCarById = async (id) => {
  try {
    return await carRepository.getCarById(id);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllCar = async () => {
  try {
    return await carRepository.getCar();
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCar = async (id) => {
  try {
    return await carRepository.deleteCar(id);
  } catch (error) {
    console.log(error);
  }
};

exports.updateCar = async (carId, updateArgs, userId) => {
  try {
    const historyId = updateArgs.historyId;
    // console.log("HISTORY", historyId);
    await historyRepository.updatedBy(userId, historyId);
    return await carRepository.updateCar(carId, updateArgs);
  } catch (error) {
    console.log(error);
  }
};
