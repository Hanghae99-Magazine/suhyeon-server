const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    userId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(60),
      allowNull: true,
      unique: "nickname"
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "nickname",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nickname" },
        ]
      },
    ]
  });
};
