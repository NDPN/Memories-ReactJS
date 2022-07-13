const Message = require("../models/message.js");

exports.getMessage = async (req, res) => {
  const { from, to } = req.body;

  const message = await Message.find({
    users: { $all: [from, to] },
  }).sort({ updateAt: 1 });

  const projectedMessage = message.map((msg) => {
    return {
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
    };
  });
  return res.status(200).json(projectedMessage);
};

exports.sendMessage = async (req, res) => {
  const { from, to, message } = req.body;
  const data = await Message.create({
    message: { text: message },
    users: [from, to],
    sender: from,
  });

  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(400).json("Something wrong !!");
  }
};
