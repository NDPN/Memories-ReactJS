const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema(
  {
    img: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Img", imgSchema);
