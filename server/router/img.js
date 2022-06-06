const express = require("express");
const { upload } = require("../common-middleware/index.js");
const { uploadImg } = require("../controller/img.js");

const router = express.Router();

router.post("/uploadImg", upload.single("Img"), uploadImg);

module.exports = router;
