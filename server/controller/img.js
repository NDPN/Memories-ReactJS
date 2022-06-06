const Img = require("../models/Img");

exports.uploadImg = (req, res) => {
  const postImg = new Img({
    img: req.file.path,
    url: "http://localhost:5000/uploads/" + req.file.filename,
  });

  return res.status(200).json({
    image: postImg,
  });
  // postImg.save((error, item) => {
  //   if (error) {
  //     return res.status(400).json({ error });
  //   }
  //   if (item) {
  //     return res.status(200).json({
  //       image: item,
  //     });
  //   }
  // });
};
