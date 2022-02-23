const { user, board, likes, comment } = require("../models");

async function getAll() {
  return board.findAll();
}

async function create(post) {
  return board
    .create({
      userId: post.userId,
      content: post.content,
      img: post.img,
      imgPosition: post.imgPosition,
    })
    .then((data) => this.getById(data.dataValues.postId));
}

async function getLikeInfo(userId, postId) {
  return likes.findOne({ where: { userId, postId } });
}

async function getById(postId) {
  return board.findOne({ where: { postId } });
}

async function remove(postId) {
  return board.findByPk(postId).then((post) => post.destroy());
}

async function update(postId, location, imgPosition, content) {
  const post = board.findOne(
    { img: location, imgPosition, content },
    { where: { postId } }
  );
}
module.exports = { getAll, create, getLikeInfo, getById, remove, update };
