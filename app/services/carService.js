const { carRepository } = require("../repositories");
const ApplicationError = require("../errors/ApplicationError");

exports.createCar = async (name, price, size, image, available, createdBy) => {
  try {
    const carPayload = {
      name,
      price,
      size: size.toLowerCase(),
      image,
      available,
      createdBy,
    };

    const payload = await carRepository.createCar(carPayload);

    return {
      id: payload?.id,
      name: payload?.name,
      price: payload?.price,
      size: payload?.size,
      image: payload?.image,
      available: payload?.available,
      updatedAt: payload?.updatedAt,
      createdAt: payload?.createdAt,
    };
  } catch (error) {
    throw new ApplicationError(500, "failed insert car!");
  }
};

exports.getCarById = async (id) => {
  try {
    const payload = await carRepository.getCarById(id);
    const carPayload = {
      id: payload?.id,
      name: payload?.name,
      price: payload?.price,
      size: payload?.size,
      image: payload?.image,
      available: payload?.available,
      createdAt: payload?.dataValues.createdAt,
      updatedAt: payload?.dataValues.updatedAt,
    };
    return carPayload;
  } catch (error) {
    throw new ApplicationError(500, "failed get car!");
  }
};

exports.getAllCar = async () => {
  try {
    const payload = await carRepository.getAllCar();
    const carPayload =
      (await payload.length) < 1
        ? []
        : payload.map((car) => {
            return {
              id: car?.dataValues?.id,
              name: car?.dataValues?.name,
              price: car?.dataValues?.price,
              size: car?.dataValues?.size,
              image: car?.dataValues?.image,
              available: car?.dataValues?.available,
              createdAt: car?.dataValues?.createdAt,
              updatedAt: car?.dataValues?.updatedAt,
            };
          });

    return carPayload;
  } catch (error) {
    throw new ApplicationError(500, "failed get car!");
  }
};
exports.getDetailAllCar = async () => {
  try {
    const payload = await carRepository.getDetailAllCar();
    const carPayload =
      (await payload.length) < 1
        ? []
        : payload.map((car) => {
            return {
              id: car?.dataValues?.id,
              name: car?.dataValues?.name,
              price: car?.dataValues?.price,
              size: car?.dataValues?.size,
              image: car?.dataValues?.image,
              available: car?.dataValues?.available,
              createdBy: {
                name: car?.created?.dataValues?.name,
                email: car?.created?.dataValues?.email || null,
              },
              updatedBy: {
                name: car?.updated?.dataValues?.name || null,
                email: car?.updated?.dataValues?.email || null,
              },
              deletedBy: {
                name: car?.deleted?.dataValues?.name || null,
                email: car?.deleted?.dataValues?.email || null,
              },
              createdAt: car?.dataValues?.createdAt,
              updatedAt: car?.dataValues?.updatedAt,
            };
          });
    return carPayload;
  } catch (error) {
    throw new ApplicationError(500, "failed get car!");
  }
};

exports.getDetailCar = async (carId) => {
  try {
    const payload = await carRepository.getDetailCar(carId);
    const carPayload = {
      id: payload?.id,
      name: payload?.name,
      price: payload?.price,
      size: payload?.size,
      image: payload?.image,
      available: payload?.available,
      createdBy: {
        name: payload?.created?.dataValues?.name,
        email: payload?.created?.dataValues?.email || null,
      },
      updatedBy: {
        name: payload?.updated?.dataValues?.name || null,
        email: payload?.updated?.dataValues?.email || null,
      },
      deletedBy: {
        name: payload?.deleted?.dataValues?.name || null,
        email: payload?.deleted?.dataValues?.email || null,
      },
      createdAt: payload?.dataValues.createdAt,
      updatedAt: payload?.dataValues.updatedAt,
    };
    return carPayload;
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
