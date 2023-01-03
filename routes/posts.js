const { Router } = require("express");
const Post = require("../models/Post");
const verify = require("./verify");
const mongoose = require("mongoose");
const User = require("../models/User");

const router = Router();

// create post

router.post("/", verify, async (req, res) => {
  const newPost = new Post({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// update a post

router.put("/:id", verify, async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (post.userId === req.user.id) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(403).send(err.message);
    }
  } else {
    res.status(403).send("You are not allowed for editing the post");
  }
});

// delete a post

router.delete("/:id", verify, async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (post.userId === req.user.id) {
    try {
      await post.deleteOne();
      res.status(200).send("Post has been deleted");
    } catch (err) {
      res.status(403).send(err.message);
    }
  } else {
    res.status(403).send("You are not allowed for deleting the post");
  }
});

// like a post

router.put("/:id/like", verify, async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(403).send("No post was found with the given id");
  try {
    if (!post?.likes?.includes(req.user.id)) {
      // If user already haven't liked this posts this will be like
      const increaseLike = await Post.findByIdAndUpdate(
        id,
        {
          $push: {
            likes: req.user.id,
          },
        },
        { new: true }
      );
      res.status(200).json(increaseLike);
    } else {
      // If user already have liked this posts this will be dislike
      const decreaseLike = await Post.findByIdAndUpdate(
        id,
        {
          $pull: {
            likes: req.user.id,
          },
        },
        { new: true }
      );
      res.status(200).json(decreaseLike);
    }
  } catch (err) {
    res.status(403).send(err.message);
  }
});

// get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// get timeline posts

router.get("/timeline/all", verify, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res
      .status(200)
      .json(
        userPosts
          .concat(...friendPosts)
          .sort((a, b) => b.createdAt - a.createdAt)
      );
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// get posts by 5-5

router.get("/timeline/additional_to_show", verify, async (req, res) => {
  let { since } = req.query;
  since = since ? new Date(since) : new Date();
  console.log(since);
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const posts = await Post.aggregate([
      {
        $match: {
          userId: {
            $nin: [req.user.id, ...user.followings],
          },
          createdAt: {
            $lt: since,
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      { $limit: 5 },
    ]);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
