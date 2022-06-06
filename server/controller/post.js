const Post = require("../models/post");

exports.createPost = (req, res) => {
  const postObj = {
    status: req.body.status,
    img: req.body.urlImg,
    userOwner: req.body.userid,
    author: req.body.author,
  };

  const post = new Post(postObj);

  post.save((error, item) => {
    if (error) {
      return res.status(400).json({ error });
    }

    if (item) {
      return res.status(200).json({ post: item });
    }
  });
};

exports.getPost = (req, res) => {
  const userOwner = req.body.userid;
  Post.find({
    userOwner,
  }).exec(async (error, item) => {
    if (error) {
      return res.status(400).json({ error });
    }

    if (item) {
      return res.status(200).json({ post: item });
    }
  });
};

exports.updatePost = async (req, res) => {
  const newPost = {
    status: req.body.status,
    img: req.body.img,
    userOwner: req.body.userid,
    likeCount: req.body.likeCount,
    author: req.body.author,
  };
  const post = await Post.findByIdAndUpdate({ _id: req.body.id }, newPost, {
    new: true,
  });

  if (post) {
    return res.status(200).json(post);
  }

  if (!post) {
    return res.status(400).json("This post in not existed");
  }
};

exports.deletePost = async (req, res) => {
  const post = await Post.findOneAndDelete({ _id: req.body.id });

  res.status(200).json({ message: "Delete successfully !!" });
};
