const express = require("express");
const postController = require("../controller/post");
const authMiddleware = require("../middlewares/auth-middleware");
const { upload } = require("../utils/s3");

const router = express.Router();

router.get("/", postController.selectAll);
router.post(
  "/",
  authMiddleware,
  upload.single("imageFile"),
  postController.insertPost
);
router.put("/:postId/like", authMiddleware, postController.like);
router.get("/:postId", postController.selectPostDetail);
router.delete("/:postId", authMiddleware, postController.deletePost);
router.put(
  "/:postId",
  authMiddleware,
  upload.single("imageFile"),
  postController.updatePost
);
