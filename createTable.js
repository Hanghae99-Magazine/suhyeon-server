const sequelizeAuto = require("sequelize-auto");

export const auto = new sequelizeAuto("magazine", "magazine_user", "1234", {
  host: "127.0.0.1",
  port: "3306",
  dialect: "mysql",
});

auto.run();
