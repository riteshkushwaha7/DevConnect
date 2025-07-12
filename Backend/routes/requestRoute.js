const express = require('express');
const router = express.Router();
const SwapCard = require('../models/swapCard.model');

router.get('/', async (req, res) => {
  try {
    const cards = await SwapCard.find({ isActive: true }).populate('user', 'name profilePic');

    const result = cards.map(card => ({
      _id: card._id,
      skillsOffered: card.skillsOffered,
      skillsWanted: card.skillsWanted,
      rating: card.rating,
      user: {
        _id: card.user._id,
        name: card.user.name,
        profilePic: card.user.profilePic?.toString('base64') || null 
      }
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
