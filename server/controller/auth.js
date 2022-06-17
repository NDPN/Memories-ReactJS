const User = require("../models/auth.js");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const ValidationResult = require("express-validator");
const jwt = require("jsonwebtoken");

// Register
exports.signUp = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec(async (error, user) => {
    if (user) {
      return res.status(400).json({
        message: "Email had existed",
        error,
      });
    }
    const { firstName, lastName, email, password, phoneNumber, userName } =
      req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      phoneNumber,
      userName: shortid.generate(),
    });
    _user.save((err, data) => {
      if (err) {
        return res.status(400).json({
          message: "Something's wrong",
        });
      }
      if (data) {
        const token = jwt.sign(
          { _id: data._id, role: data.role },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_Expired }
        );
        const { _id, firstName, lastName, email, role, fullName, phoneNumber } =
          data;

        return res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
            phoneNumber,
            userName,
          },
          message: "Signup Successfully ",
        });
      }
    });
  });
};

// Login
exports.signIn = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec(async (error, user) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (user) {
      let password = await user.authenticate(req.body.password);
      if (password) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_Expired }
        );
        const {
          _id,
          firstName,
          lastName,
          fullName,
          email,
          role,
          phoneNumber,
          avatar,
          friend,
          request,
        } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            fullName,
            email,
            role,
            phoneNumber,
            avatar,
            friend,
            request,
          },
        });
      } else {
        return res.status(400).json({ message: "Wrong password !!" });
      }
    } else {
      return res.status(400).json({ message: "Have something wrong !!" });
    }
  });
};

// Change avatar
exports.changeAvatar = async (req, res) => {
  const newAvatar = {
    avatar: req.body.urlImg,
  };

  const _id = req.body._id;
  await User.findByIdAndUpdate({ _id }, newAvatar, {
    new: true,
  });

  res.status(200).json(newAvatar);
};

// Sign out
exports.signOut = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully",
  });
};

// Authenticate
exports.authenticate = (req, res) => {
  res.status(200).json({
    authenticate: true,
  });
};

// Find user
exports.findUser = async (req, res) => {
  const name = RegExp(req.body.name, "i");
  const user = await User.find({
    $or: [{ firstName: name }, { lastName: name }, { email: name }],
  })
    .select("_id firstName lastName userName email role")
    .exec();
  if (user) {
    return res.status(200).json({ user });
  }
};

// Send friend request
exports.sendFriendReq = async (req, res) => {
  let friendEmail = req.body.friendEmail;
  let emailSendReq = req.body.emailSendReq.split();
  let allUser = [];
  checkUser(emailSendReq)
    .then((res) => res.map((item) => (item[0] ? allUser.push(item[0]) : "")))
    .finally(() => {
      if (allUser.length > 0) {
        let newPromise = allUser.map((item) => {
          const fullName = item.lastName + " " + item.firstName;
          return User.findOneAndUpdate(
            {
              email: friendEmail,
            },
            { $push: { request: [item._id, fullName, item.avatar] } },
            { new: true }
          );
        });
        Promise.all(newPromise)
          .then((res) => res)
          .finally(() => {
            res
              .status(200)
              .json({ message: "You have send a add friend request" });
          });
      } else {
        res.status(400).json({ message: "User not found" });
      }
    });
};

// Accept add friend request
exports.acceptRequest = async (req, res) => {
  const { id } = req.params;
  const userAcceptId = req.body.userAcceptId;
  await User.findOne({ _id: id })
    .select("lastName firstName avatar")
    .exec()
    .then((user) => {
      if (user) {
        User.updateOne(
          { _id: userAcceptId },
          { $push: { friend: [user] }, $pull: { request: [user._id] } },
          { new: true }
        );
        return res.status(200).json({ message: "Successfully" });
      }

      if (error) {
        return res.status(400).json(error);
      }
    });
};

// Check user func
checkUser = async (users) => {
  let promise = users.map((email) => {
    return User.find({ email: email.substring(1, email.length) })
      .select("lastName firstName avatar")
      .exec()
      .then((user) => user);
  });

  return Promise.all(promise);
};
