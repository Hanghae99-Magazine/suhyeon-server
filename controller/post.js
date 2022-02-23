const postRepository = require("../data/post");
const authMiddleware = require("../middlewares/auth-middleware");
const { user, board, likes, comment } = require("../models");

// 목록 가져오기 (인증X)
export async function selectAll(req, res) {
  const posts = await board.findAll();
  res.json({ posts });
}

// 게시글 추가 (인증O)
export async function insertPost(req, res) {
  const { user_id, post_content } = req.body;
  const { location } = req.file;

  if (!post_content && !location) {
    res.status(400).send({ msg: "사진 또는 내용을 입력해주세요!" });
  }
  await postRepository.create({
    userId: user_id,
    content: post_content,
    img: location,
  });
  res.status(201).send({ msg: "게시물이 등록되었습니다!" });
}

// 게시글 좋아요 및 좋아요 취소 (인증O)
export async function like(req, res) {
  const { postId } = Number(req.params);
  const userId = authMiddleware.userId;

  const checkExist = await likes.findOne({ where: { userId, postId } });
  if (checkExist) {
    await likes.update({ isCheck: false });
    res.status(200).json({ like_check: false, msg: "좋아요 취소" });
    return;
  }
  await likes.update({ isCheck: true });
  res.status(200).json({ like_check: true, msg: "좋아요 등록" });
}

// 게시글 조회 (인증X)
export async function selectPostDetail(req, res) {
  const { postId } = Number(req.params);
  if (!postId) {
    res.status(400).send({ msg: `${postId}번 게시물이 존재하지 않습니다.` });
    return;
  }
  const post = await board.findOne({ where: { postId } });
  res.json({ post });
}

// 게시글 삭제 (인증O)
export async function deletePost(req, res) {
  const { postId } = Number(req.params);
  const existPost = await postRepository.getById(postId);
  if (!existPost) {
    return res
      .status(400)
      .json({ msg: `${postId}번 게시물이 존재하지 않습니다.` });
  }
  if (existPost.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await postRepository.remove(postId);
  res.sendStatus(204);
}

// 게시글 수정 (인증O)
export async function updatePost(req, res) {
  const { postId } = req.params;
  const { post_id, post_content } = req.body;
  const { location } = req.file;

  const existPost = await postRepository.getById(postId);
  if (!existPost) {
    return res
      .status(400)
      .json({ msg: `${postId}번 게시물이 존재하지 않습니다.` });
  }
  if (existPost.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await postRepository.update(postId, location, post_content);
  res.status(200).json({ msg: "수정되었습니다." });
}
