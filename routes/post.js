const express = require("express");
const { Op } = require("sequelize");
const { user, board, likes, comment } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

// 목록 가져오기
router.get("/", async (req, res) => {});

// 게시글 추가
router.post("/", async (req, res) => {});

// 게시글 좋아요 및 좋아요 취소
router.put("/:postId/like", async (req, res) => {});

// 게시글 상세조회
router.get("/:postId", async (req, res) => {});

// 게시글 삭제
router.delete("/:postId", async (req, res) => {});

// 게시글 수정
router.put("/:postId", async (req, res) => {});
