const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");

//@route POST api/posts
//@descr create a post
//@access private

router.post(
  "/",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
//@route GET api/posts
//@descr Get all posts
//@access private
router.get("/", auth, async (req, res) => {
  try {
    // sort -1 for recent posts first
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
//@route GET api/posts/:id
//@descr Get a post by  id
//@access private
router.get("/:id", auth, async (req, res) => {
  try {
    //req.params used to obtain data from url
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    //if not a valid object ID
    if ((err.kind = "ObjectId")) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("server error");
  }
});

//@route DELETE api/posts/:id
//@descr Delete a post by  id
//@access private
router.delete("/:id", auth, async (req, res) => {
  try {
    //req.params used to obtain data from url
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    // To check only the user created can delete the post
    // post.user is an object, id is a string hence convetered to string
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" }); // status(401) authorization error
    }
    await post.remove();
    res.json({ msg: "Post is removed" });
  } catch (err) {
    console.error(err.message);
    //if not a valid object ID
    if ((err.kind = "ObjectId")) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("server error");
  }
});

//@route PUT api/like/:id
//@descr Add a like for the post using post id
//@access private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if the post is already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route PUT api/unlikelike/:id
//@descr remove a like for the post using post id
//@access private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if the post is already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }
    // Get the remove Indec
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
