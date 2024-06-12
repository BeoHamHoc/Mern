const express = require("express");
const router = express.Router();

const Post = require("../models/Posts");
const { post } = require("./auth");
const verifyToken = require("../middleware/auth");

// @route POST api/posts
// @desc Create post
// @access private
router.post("/", verifyToken, async (req, res) => {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Sever error" });
  }
});

//
// @route GET api/posts
// @desc GET post
// @access private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Sever error" });
  }
});

// @route PUT api/posts
// @desc Update post
// @access private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    let updatedPost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };
    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );
    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    res.json({ success: true, message: "Update success!", post:  updatedPost });
  } catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
});


// @route DELETE api/posts
// @desc delete post
// @access private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletePostCondition = { _id: req.params.id, user: req.userId}
    const deletePost = await Post.findOneAndDelete(deletePostCondition)

    if(!deletePost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

      res.json({ success: true, message: "Delete success!", post:  deletePost });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Sever error" });
  }
});
module.exports = router;
