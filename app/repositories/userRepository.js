const { User } = require("../models");

exports.create = (createArgs) => {
  return User.create(createArgs);
};

exports.findByEmail = (email) => {
  return User.findOne({
    where: { email },
  });
};

exports.find = (id) => {
  return User.findByPk(id);
};

exports.delete = (id) => {
  return User.destroy(id);
};

exports.getAllUser = () => {
  return User.findAll();
};
