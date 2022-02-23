const postRepository = require("../data/post");
const authMiddleware = require("../middlewares/auth-middleware");
const { likes } = require("../models");
// 목록 가져오기 (인증X)
async function selectAll(req, res) {
  const posts = await postRepository.getAll();
  res.json({ posts });
}

// 게시글 추가 (인증O)
async function insertPost(req, res) {
  const { post_content, img_position } = req.body;
  const userId = res.locals.user.userId;
  const { location } = req.file;

  if (!post_content && !location) {
    res.status(400).send({ msg: "사진 또는 내용을 입력해주세요!" });
  }
  await postRepository.create({
    userId,
    content: post_content,
    imgPosition: img_position,
    img: location,
  });
  res.status(201).send({ msg: "게시물이 등록되었습니다!" });
}

// 게시글 좋아요 및 좋아요 취소 (인증O)
async function like(req, res) {
  const { postId } = Number(req.params);
  const userId = res.locals.user.userId;

  const checkExist = await postRepository.getLikeInfo(userId, postId);
  if (checkExist) {
    await likes.update({ isCheck: false });
    res.status(200).json({ like_check: false, msg: "좋아요 취소" });
    return;
  }
  await likes.update({ isCheck: true });
  res.status(200).json({ like_check: true, msg: "좋아요 등록" });
}

// 게시글 조회 (인증X)
async function selectPostDetail(req, res) {
  const { postId } = Number(req.params);
  if (!postId) {
    res.status(400).send({ msg: `${postId}번 게시물이 존재하지 않습니다.` });
    return;
  }
  const post = await postRepository.getById(postId);
  res.json({ post });
}

// 게시글 삭제 (인증O)
async function deletePost(req, res) {
  const { postId } = Number(req.params);
  const userId = authMiddleware.userId;
  const existPost = await postRepository.getById(postId);
  if (!existPost) {
    return res
      .status(400)
      .json({ msg: `${postId}번 게시물이 존재하지 않습니다.` });
  }
  if (existPost.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await postRepository.remove(userId, postId);
  res.sendStatus(204);
}

// 게시글 수정 (인증O)
async function updatePost(req, res) {
  const { post_id, post_content, img_position } = req.body;
  const { location } = req.file;

  const existPost = await postRepository.getById(post_id);
  if (!existPost) {
    return res
      .status(400)
      .json({ msg: `${post_id}번 게시물이 존재하지 않습니다.` });
  }
  if (existPost.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await postRepository.update(post_id, location, img_position, post_content);
  res.status(200).json({ msg: "수정되었습니다." });
}

module.exports = {
  selectAll,
  insertPost,
  like,
  selectPostDetail,
  deletePost,
  updatePost,
};
