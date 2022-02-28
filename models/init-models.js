/* eslint-disable no-underscore-dangle */
const { DataTypes } = require('sequelize');
const _SequelizeMeta = require('./SequelizeMeta');
const _board = require('./board');
const _comment = require('./comment');
const _likes = require('./likes');
const _user = require('./user');

function initModels(sequelize) {
  const SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  const board = _board(sequelize, DataTypes);
  const comment = _comment(sequelize, DataTypes);
  const likes = _likes(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);

  board.belongsToMany(user, {
    as: 'userId_users',
    through: likes,
    foreignKey: 'postId',
    otherKey: 'userId',
  });
  user.belongsToMany(board, {
    as: 'postId_boards',
    through: likes,
    foreignKey: 'userId',
    otherKey: 'postId',
  });
  comment.belongsTo(board, { as: 'post', foreignKey: 'postId' });
  board.hasMany(comment, { as: 'comments', foreignKey: 'postId' });
  likes.belongsTo(board, { as: 'post', foreignKey: 'postId' });
  board.hasMany(likes, { as: 'likes', foreignKey: 'postId' });
  board.belongsTo(user, { as: 'user', foreignKey: 'userId' });
  user.hasMany(board, { as: 'boards', foreignKey: 'userId' });
  comment.belongsTo(user, { as: 'user', foreignKey: 'userId' });
  user.hasMany(comment, { as: 'comments', foreignKey: 'userId' });
  likes.belongsTo(user, { as: 'user', foreignKey: 'userId' });
  user.hasMany(likes, { as: 'likes', foreignKey: 'userId' });

  return {
    SequelizeMeta,
    board,
    comment,
    likes,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
