const express = require("express");
const { upload, requireSignin } = require("../common-middleware/index.js");
const { getMessage, sendMessage } = require("../controller/message");

const router = express.Router();

router.post("/getMessage", requireSignin, upload.none(), getMessage);

router.post("/sendMessage", requireSignin, upload.none(), sendMessage);

module.exports = router;
