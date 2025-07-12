const express = require('express');
const multer = require('multer');
const router = express.Router();
const User = require('../models/models.scheme.js');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.put('/update', upload.single('profilePic'), async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required to update profile.' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const {
      name,
      password,
      location,
      skillsOffered,
      skillsWanted,
      availability,
      description,
      isPublic
    } = req.body;

    if (name) user.name = name;
    if (password) user.password = await User.hashedPassword(password);
    if (location) user.location = location;
    if (skillsOffered) {
      user.skillsOffered = Array.isArray(skillsOffered) ? skillsOffered : [skillsOffered];
    }
    if (skillsWanted) {
      user.skillsWanted = Array.isArray(skillsWanted) ? skillsWanted : [skillsWanted];
    }
    if (availability) user.availability = availability;
    if (description) user.description = description;
    if (typeof isPublic !== 'undefined') user.isPublic = isPublic;

    if (req.file) {
      user.profilePic = req.file.buffer;
      user.profilePicType = req.file.mimetype;
    }

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
