const { History } = require("../models");

exports.createdBy = (userId) => {
  return History.create({ createdBy: userId });
};
exports.updatedBy = (userId, historyId) => {
  return History.update({ updatedBy: userId }, { where: { id: historyId } });
};
exports.deletedBy = (userId, historyId) => {
  return History.update({ deletedBy: userId }, { where: { id: historyId } });
};
