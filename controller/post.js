const postRepository = require('../data/post');
const { likes } = require('../models');
// 목록 가져오기 (인증X)
async function selectAll(req, res) {
  const posts = await postRepository.getAll();
  res.json({ posts });
}

// 게시글 추가 (인증O)
async function insertPost(req, res) {
  // eslint-disable-next-line camelcase
  const { post_content, img_position } = req.body;
  const { userId } = req;
  const { location } = req.file;

  // eslint-disable-next-line camelcase
  if (!post_content && !location) {
    res.status(400).send({ msg: '사진 또는 내용을 입력해주세요!' });
  }
  await postRepository.create({
    userId,
    // eslint-disable-next-line camelcase
    content: post_content,
    // eslint-disable-next-line camelcase
    imgPosition: img_position,
    img: location,
  });
  res.status(201).send({ msg: '게시물이 등록되었습니다!' });
}

// 게시글 좋아요 등록(인증O)
async function createLike(req, res) {
  const postId = Number(req.params.postId);
  const { userId } = req;

  await likes.create({ userId, postId, isCheck: true });
  res.status(200).json({ like_check: true, msg: '좋아요 등록' });
}

// 게시글 좋아요 해제(인증O)
async function updateLike(req, res) {
  const postId = Number(req.params.postId);
  const { userId } = req;

  const checkExist = await postRepository.getLikeInfo(userId, postId);

  if (checkExist) {
    await likes.update({ isCheck: false }, { where: { postId } });
  }
  res.status(200).json({ like_check: false, msg: '좋아요 해제' });
}

// 게시글 조회 (인증X)
async function selectPostDetail(req, res) {
  const postId = Number(req.params.postId);

  if (!postId) {
    res.status(400).send({ msg: `${postId}번 게시물이 존재하지 않습니다.` });
    return;
  }
  const post = await postRepository.getById(postId);
  res.json({ post });
}

// 게시글 삭제 (인증O)
// eslint-disable-next-line consistent-return
async function deletePost(req, res) {
  const postId = Number(req.params.postId);
  const { userId } = req;
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
// eslint-disable-next-line consistent-return
async function updatePost(req, res) {
  // eslint-disable-next-line camelcase
  const { post_id, post_content, img_position } = req.body;
  const { location } = req.file;

  const existPost = await postRepository.getById(post_id);
  if (!existPost) {
    return (
      res
        .status(400)
        // eslint-disable-next-line camelcase
        .json({ msg: `${post_id}번 게시물이 존재하지 않습니다.` })
    );
  }
  if (existPost.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await postRepository.update(post_id, location, img_position, post_content);
  res.status(200).json({ msg: '수정되었습니다.' });
}

module.exports = {
  selectAll,
  insertPost,
  createLike,
  updateLike,
  selectPostDetail,
  deletePost,
  updatePost,
};
