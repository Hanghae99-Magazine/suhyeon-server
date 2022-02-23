const express = require("express");
const {
  selectAll,
  insertPost,
  createLike,
  updateLike,
  selectPostDetail,
  deletePost,
  updatePost,
} = require("../controller/post");
const authMiddleware = require("../middlewares/auth-middleware");
const { upload } = require("../utils/s3");

const router = express.Router();

router.get("/", selectAll);
router.post("/", authMiddleware, upload.single("imageFile"), insertPost);
router.post("/:postId/like", authMiddleware, createLike);
router.put("/:postId/like", authMiddleware, updateLike);
router.get("/:postId", selectPostDetail);
router.delete("/:postId", authMiddleware, deletePost);
router.put("/:postId", authMiddleware, upload.single("imageFile"), updatePost);

module.exports = router;
