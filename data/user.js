const { user } = require("../models");

async function findByUserId(userId) {
  return user.findOne({ where: { userId } });
}

async function createUser(user) {
  return user.create(user).then((data) => data.dataValues.id);
}

module.exports = { findByUserId, createUser };
