const express = require("express");
const { Op } = require("sequelize");
const cors = require("cors");
const { user, board, likes, comment } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const upload = require("../utils/s3");

const router = express.Router();

// 목록 가져오기 (인증X)
router.get("/", async (req, res) => {
  const posts = await board.findAll();
  res.json({ posts });
});

// 게시글 추가 (인증O)
router.post(
  "/",
  authMiddleware,
  upload.single("imageFile"),
  async (req, res) => {
    const { user_id, post_content } = req.body;
    const { location } = req.file;

    if (!post_content && !location) {
      res.status(400).send({ msg: "사진 또는 내용을 입력해주세요!" });
    }

    await board.create({
      userId: user_id,
      content: post_content,
      img: location,
    });
    res.status(201).send({ msg: "게시물이 등록되었습니다!" });
  }
);

// 게시글 좋아요 및 좋아요 취소 (인증O)
router.put("/:postId/like", authMiddleware, async (req, res) => {});

// 게시글 조회 (인증X)
router.get("/:postId", async (req, res) => {});

// 게시글 삭제 (인증O)
router.delete("/:postId", authMiddleware, async (req, res) => {});

// 게시글 수정 (인증O)
router.put("/:postId", authMiddleware, async (req, res) => {});

module.exports = router;
