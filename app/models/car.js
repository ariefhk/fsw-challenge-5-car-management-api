"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.History, {
        foreignKey: "historyId",
      });
    }
  }
  Car.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      size: DataTypes.STRING,
      image: DataTypes.STRING,
      available: DataTypes.BOOLEAN,
      historyId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Car",
    }
  );
  Car.beforeCreate((car) => (car.id = uuidv4()));
  return Car;
};
