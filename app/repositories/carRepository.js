const { Car, History } = require("../models");

exports.createCar = (createArgs) => {
  return Car.create(createArgs);
};

exports.updateCar = (carId, updateArgs) => {
  return Car.update(updateArgs, { where: { id: carId } });
};

exports.deleteCar = (carId) => {
  return Car.destroy({ where: { id: carId } });
};

exports.getCar = () => {
  return Car.findAll({
    include: {
      model: History,
    },
  });
};

exports.getCarById = (carId) => {
  return Car.findOne({ where: { id: carId } });
};

exports.getCarUser = () => {
  return Car.findAll({
    attributes: { exclude: ["historyId"] },
  });
};
