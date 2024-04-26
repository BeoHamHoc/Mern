const express = require("express");
const router = express.Router();

const Post = require("../models/Posts");
const { post } = require("./auth");
const verifyToken = require("../middleware/auth")

// @route POST api/posts
// @desc Create post
// @access private
router.post("/" ,verifyToken , async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https//:") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newPost.save();

    res.json({ success: true, message: "Happy learning!", post: newPost });
  } catch {
    console.log(error);
    res.status(500).json({ success: false, message: "Sever error" });
  }
});
module.exports = router;
