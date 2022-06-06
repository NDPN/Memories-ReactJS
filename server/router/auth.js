const express = require("express");
const { upload, requireSignin } = require("../common-middleware/index.js");
const {
  signUp,
  signIn,
  signOut,
  authenticate,
  findUser,
  addFriend,
} = require("../controller/auth.js");

const router = express.Router();

// signUp
router.post("/signup", upload.none(), signUp);

// signIn
router.post("/signin", upload.none(), signIn);

// SignOut
router.post("/signout", upload.none(), signOut);

// uthenticate
router.post("/auth", requireSignin, authenticate);

// Find user
router.post("/user", requireSignin, upload.none(), findUser);

// Add friend a user
router.post("/addfr", requireSignin, upload.none(), addFriend);

module.exports = router;
