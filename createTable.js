/* eslint-disable new-cap */
const sequelizeAuto = require('sequelize-auto');

const auto = new sequelizeAuto('magazine', 'magazine_user', '1234', {
  host: '127.0.0.1',
  port: '3306',
  dialect: 'mysql',
});
module.exports = auto;
auto.run();
