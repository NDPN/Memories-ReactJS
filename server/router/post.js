const express = require("express");
const { upload, requireSignin } = require("../common-middleware/index.js");
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controller/post");

const router = express.Router();

// Create Post
router.post(
  "/post/create",
  requireSignin,
  upload.single("Img"),
  createPost
);

// Get Post
router.post("/post/getPosts", requireSignin, upload.none(), getPost);

// Update Post
router.post("/post/update", requireSignin, upload.none(), updatePost);

// Delete Post
router.post("/post/delete", requireSignin, upload.none(), deletePost);

module.exports = router;
