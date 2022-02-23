const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "board",
    {
      postId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING(50),
        allowNull: true,
        references: {
          model: "user",
          key: "userId",
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      img: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      imgPosition: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      uploadDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      tableName: "board",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "postId" }],
        },
        {
          name: "userId",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
      ],
    }
  );
};
