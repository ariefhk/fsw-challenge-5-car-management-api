const { User, Role } = require("../models");
const { ACCESS_CONTROL } = require("../../config/application");

exports.create = (createArgs) => {
  return User.create(createArgs);
};

exports.findByEmail = (email) => {
  return User.findOne({
    where: { email },
    include: [{ model: Role, attributes: ["id", "name"] }],
  });
};

exports.findMemberRole = () => {
  return Role.findOne({
    where: { id: ACCESS_CONTROL.MEMBER },
  });
};

exports.findAdminRole = () => {
  return Role.findOne({
    where: { id: ACCESS_CONTROL.ADMIN },
  });
};

exports.find = (id) => {
  return User.findByPk(id);
};

exports.delete = (id) => {
  return User.destroy(id);
};

exports.findAll = () => {
  return User.findAll();
};
