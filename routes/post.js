const express = require("express");
const {
  selectAll,
  insertPost,
  like,
  selectPostDetail,
  deletePost,
  updatePost,
} = require("../controller/post");
const authMiddleware = require("../middlewares/auth-middleware");
const { upload } = require("../utils/s3");

const router = express.Router();

router.get("/", selectAll);
router.post("/", authMiddleware, upload.single("imageFile"), insertPost);
router.put("/:postId/like", authMiddleware, like);
router.get("/:postId", selectPostDetail);
router.delete("/:postId", authMiddleware, deletePost);
router.put("/:postId", authMiddleware, upload.single("imageFile"), updatePost);

module.exports = router;
