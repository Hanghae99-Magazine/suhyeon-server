const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comment',
    {
      commentId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'board',
          key: 'postId',
        },
      },
      userId: {
        type: DataTypes.STRING(50),
        allowNull: true,
        references: {
          model: 'user',
          key: 'userId',
        },
      },
      commentContent: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      commentUploadDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      tableName: 'comment',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'commentId' }],
        },
        {
          name: 'userId',
          using: 'BTREE',
          fields: [{ name: 'userId' }],
        },
        {
          name: 'postId',
          using: 'BTREE',
          fields: [{ name: 'postId' }],
        },
      ],
    }
  );
};
