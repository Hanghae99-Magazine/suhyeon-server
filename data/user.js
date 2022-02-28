const Sequelize = require("sequelize");
const { user } = require("../models");

async function findByUserId(userId) {
  return user.findOne({ where: { userId } });
}

async function createUser(users) {
  console.log("adssdasdasdasd", users);
  return user.create(users).then((data) => data.dataValues.id);
}

module.exports = { findByUserId, createUser };
