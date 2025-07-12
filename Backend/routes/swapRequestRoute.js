const express = require('express');
const router = express.Router();
const SwapRequest = require('../models/swapRequest.model');

router.post('/send', async (req, res) => {
  const { swapCard, requestedBy, cardOwner } = req.body;

  if (!swapCard || !requestedBy || !cardOwner) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existing = await SwapRequest.findOne({ swapCard, requestedBy });
  if (existing) {
    return res.status(409).json({ message: 'Request already exists' });
  }

  const request = await SwapRequest.create({ swapCard, requestedBy, cardOwner });
  res.status(201).json({ message: 'Request sent', request });
});

router.get('/received/:userId', async (req, res) => {
  const { userId } = req.params;

  const requests = await SwapRequest.find({ cardOwner: userId })
    .populate('requestedBy', 'name profilePic')
    .populate('swapCard', 'skillsOffered skillsWanted');

  res.status(200).json(requests);
});

router.get('/sent/:userId', async (req, res) => {
  const { userId } = req.params;

  const requests = await SwapRequest.find({ requestedBy: userId })
    .populate('cardOwner', 'name profilePic')
    .populate('swapCard', 'skillsOffered skillsWanted');

  res.status(200).json(requests);
});

router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const request = await SwapRequest.findByIdAndUpdate(id, { status }, { new: true });
  if (!request) {
    return res.status(404).json({ message: 'Request not found' });
  }

  res.status(200).json({ message: 'Status updated', request });
});

// ✅ Add this:
module.exports = router;
