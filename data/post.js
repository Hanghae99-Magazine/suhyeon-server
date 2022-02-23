const { user, board, likes, comment } = require("../models");

async function getAll() {
  return board.findAll();
}

async function create(post) {
  return board.create(post).then((data) => this.getById(data.dataValues.id));
}

async function getLikeInfo(userId, postId) {
  return likes.findAll({ where: { userId, postId } });
}

async function getById(postId) {
  return board.findOne({ where: { postId } });
}

async function remove(postId) {
  return board.findByPk(postId).then((post) => post.remove());
}

async function update(postId, location, imgPosition, content) {
  const post = board.findOne(
    { img: location, imgPosition, content },
    { where: { postId } }
  );
}
module.exports = { getAll, create, getLikeInfo, getById, remove, update };
