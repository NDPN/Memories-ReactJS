const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  friend: {
    type: [Array],
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("friendList", friendSchema);
