const { Router } = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = Router();

// Register

router.post("/register", async (req, res) => {
  const user = new User(req.body);

  try {
    const registeredUser = await user.save();
    const payload = {
      username: registeredUser.username,
      isAdmin: registeredUser.isAdmin,
      email: registeredUser.email,
      id: registeredUser._id,
    };
    const accessToken = generateAccessToken(payload);

    const { password, ...others } = registeredUser._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Check the given user email, then if exists check password,but not send error
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(403).send("No user was found with given email");
    // Check encoded password bcrypt compare function
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (!result) return res.status(403).send("Invalid password");
      const { password, ...others } = user._doc;
      const payload = {
        username: user.username,
        isAdmin: user.isAdmin,
        email: user.email,
        id: user._id,
      };
      const accessToken = generateAccessToken(payload);
      res.status(200).json({ ...others, accessToken });
    });
  } catch (error) {
    res.status(403).send(error.message);
  }
});

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET);
}

module.exports = router;
