const express = require("express");
const { Op } = require("sequelize");
const { user, board, likes, comment } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

// 목록 가져오기 (인증X)
router.get("/", async (req, res) => {
  const posts = await board.findAll();
  res.json({ posts });
});

// 게시글 추가 (인증O)
router.post("/", authMiddleware, async (req, res) => {
  const { user_id, img_position, post_img, post_content } = req.body;
});

// 게시글 좋아요 및 좋아요 취소 (인증O)
router.put("/:postId/like", authMiddleware, async (req, res) => {});

// 게시글 조회 (인증X)
router.get("/:postId", async (req, res) => {});

// 게시글 삭제 (인증O)
router.delete("/:postId", authMiddleware, async (req, res) => {});

// 게시글 수정 (인증O)
router.put("/:postId", authMiddleware, async (req, res) => {});

module.exports = router;
