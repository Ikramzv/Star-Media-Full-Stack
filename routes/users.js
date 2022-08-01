const { Router } = require("express")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const verify = require("./verify")
const Post = require("../models/Post")
const router = Router();

// update user
router.put("/:id", verify, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(400).send("No user was found with given ID");
  try {
    if (req.user.id === user._id || req.user.isAdmin) {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 12);
      }
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(400).send("You can not update user");
    }
  } catch (error) {
    res.status(400).send(err.message);
  }
});

// delete user

router.delete("/:id", verify, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user)
    return res
      .status(400)
      .send("Error while deleting user. No user was found with the given id");
  try {
    if (req.user.id === user._id || req.user.isAdmin) {
      console.log(req.user);
      await User.findByIdAndDelete(id);
      res.status(200).send("User deleted succesfully");
    } else {
      res.status(400).send("You can not delete user");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get a user

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.message);
  }
});

// get user with query

router.get('/' , verify , async(req,res) => {
  const { username } = req.query
  var regex = new RegExp(["^", username, "$"].join(""), "i")
  try {
    const user = await User.findOne({
      username: regex
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
})

// get user's all post 

router.get('/profile/:id' , verify , async(req,res) => {
  const { id } = req.params
  try {
      const posts = await Post.find({userId: id}).sort({createdAt: -1})
      res.status(200).json(posts)
  } catch (error) {
      res.status(403).send("Error while being get user's all posts")
  }
})

// Get followings

router.get('/followings/:id' , verify ,async(req,res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    const followings = user?.followings
    const followingUser = await Promise.all(
        followings.map(followingId => {
          return User.findById(followingId)
        }
    ))
    res.status(200).json(followingUser)
  } catch (error) {
    res.status(400).send('Error while getting online friends')
  }
})

// follow a user

router.put("/:id/follow", verify, async (req, res) => {
  const { id } = req.params;
  
  if (req.user.id !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(req.user.id);
      if (!user?.followers?.includes(req.user.id)) {
        await user?.updateOne({$push: {followers: req.user.id} });
        await currentUser?.updateOne({$push: {followings: id} });
        res.status(200).json('User has been followed')
      } else {
        res.status(400).send('You are already following this user')
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res.status(403).send("You can not follow yourself");
  }
});

// unfollow a user

router.put("/:id/unfollow", verify, async (req, res) => {
  const { id } = req.params;
  
  if (req.user.id !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(req.user.id);
      if(user?.followers?.includes(req.user.id))
      await user?.updateOne({$pull: {followers: req.user.id}});
      await currentUser?.updateOne({$pull: {followings: id}});
      res.status(200).json('User has been unfollowed')
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    res.status(403).send("You can not follow yourself");
  }
});
module.exports = router;
