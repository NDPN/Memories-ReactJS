const express = require("express");
const { upload, requireSignin } = require("../common-middleware/index.js");
const {
  signUp,
  signIn,
  signOut,
  authenticate,
  findUser,
  changeAvatar,
  sendFriendReq,
  acceptRequest,
} = require("../controller/auth.js");

const router = express.Router();

// signUp
router.post("/signup", upload.none(), signUp);

// signIn
router.post("/signin", upload.none(), signIn);

// SignOut
router.post("/signout", upload.none(), signOut);

// Authenticate
router.post("/auth", requireSignin, authenticate);

// Update user
router.post("/changeAvatar", requireSignin, upload.single("Img"), changeAvatar);

// Find user
router.post("/user", requireSignin, upload.none(), findUser);

// Send friend request
router.post("/addfriend", requireSignin, upload.none(), sendFriendReq);

// Accept add friend request
router.post("/acceptfriend/:id", requireSignin, upload.none(), acceptRequest)
module.exports = router;
