"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      createdBy: DataTypes.UUID,
      updatedBy: DataTypes.UUID,
      deletedBy: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  History.beforeCreate((history) => (history.id = uuidv4()));
  return History;
};
