var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _board = require("./board");
var _comment = require("./comment");
var _likes = require("./likes");
var _user = require("./user");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var board = _board(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var likes = _likes(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  board.belongsToMany(user, { as: 'userId_users', through: likes, foreignKey: "postId", otherKey: "userId" });
  user.belongsToMany(board, { as: 'postId_boards', through: likes, foreignKey: "userId", otherKey: "postId" });
  comment.belongsTo(board, { as: "post", foreignKey: "postId"});
  board.hasMany(comment, { as: "comments", foreignKey: "postId"});
  likes.belongsTo(board, { as: "post", foreignKey: "postId"});
  board.hasMany(likes, { as: "likes", foreignKey: "postId"});
  board.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(board, { as: "boards", foreignKey: "userId"});
  comment.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(comment, { as: "comments", foreignKey: "userId"});
  likes.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(likes, { as: "likes", foreignKey: "userId"});

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
