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
  findUserById,
} = require("../controller/auth.js");

const router = express.Router();

// signUp
router.post("/signup", upload.none(), signUp);

// signIn
router.post("/signin", upload.none(), signIn);

// SignOut
router.post("/signout", upload.none(), signOut);

// Authenticate
router.post("/auth", requireSignin, upload.none(), authenticate);

// Update user
router.post("/changeAvatar", requireSignin, upload.single("Img"), changeAvatar);

// Find user by Id
router.post("/findUserName", requireSignin, upload.none(), findUser);

// Find user by name
router.post("/findUserId", requireSignin, upload.none(), findUserById);

// Send friend request
router.post("/addfriend", requireSignin, upload.none(), sendFriendReq);

// Accept add friend request
router.post("/acceptfriend", requireSignin, upload.none(), acceptRequest);
module.exports = router;
