const { carRepository } = require("../repositories");
const ApplicationError = require("../errors/ApplicationError");

exports.createCar = async (name, price, size, image, available, createdBy) => {
  try {
    const car = {
      name,
      price,
      size: size.toLowerCase(),
      image,
      available,
      createdBy,
    };
    return await carRepository.createCar(car);
  } catch (error) {
    throw new ApplicationError(500, "failed insert car!");
  }
};

exports.getCarById = async (id) => {
  try {
    return await carRepository.getCarById(id);
  } catch (error) {
    throw new ApplicationError(500, "failed get car!");
  }
};

exports.getAllCar = async () => {
  try {
    return await carRepository.getCar();
  } catch (error) {
    throw new ApplicationError(500, "failed get car!");
  }
};

exports.getDetailCar = async (carId) => {
  try {
    const carPayload = await carRepository.getDetailCar(carId);
    const payload = {
      id: carPayload.id,
      name: carPayload.name,
      price: carPayload.price,
      size: carPayload.size,
      available: carPayload.available,
      createdByUser: {
        name: carPayload.created?.dataValues?.name,
        email: carPayload.created?.dataValues?.email || null,
      },
      updatedByUser: {
        name: carPayload.updated?.dataValues?.name || null,
        email: carPayload.updated?.dataValues?.email || null,
      },
      deletedByUser: {
        name: carPayload.deleted?.dataValues?.name || null,
        email: carPayload.deleted?.dataValues?.email || null,
      },
    };
    // return carPayload;
    return payload;
  } catch (error) {
    throw new ApplicationError(500, "failed get car!");
  }
};

exports.deleteCar = async (carId, deletedBy) => {
  try {
    await carRepository.updateCar(carId, { deletedBy });
    return await carRepository.deleteCar(carId);
  } catch (error) {
    throw new ApplicationError(500, "failed delete car!");
  }
};

exports.updateCar = async (carId, updateArgs) => {
  try {
    return await carRepository.updateCar(carId, updateArgs);
  } catch (error) {
    throw new ApplicationError(500, "failed update car!");
  }
};
