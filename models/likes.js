module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'likes',
    {
      userId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'user',
          key: 'userId',
        },
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'board',
          key: 'postId',
        },
      },
      isCheck: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'likes',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'userId' }, { name: 'postId' }],
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
