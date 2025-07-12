const express = require('express');
const router = express.Router();
const User = require('../models/models.scheme.js');

router.get('/user', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email }).select('-password -profilePicType');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userObj = user.toObject();
    if (userObj.profilePic) {
      userObj.profilePic = userObj.profilePic.toString('base64');
    }

    res.status(200).json(userObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
