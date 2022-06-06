const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  img: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  userAccess: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Posts", postSchema);
