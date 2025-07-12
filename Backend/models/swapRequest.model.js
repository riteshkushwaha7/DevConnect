const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  cardOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  swapCard: { type: mongoose.Schema.Types.ObjectId, ref: 'SwapCard', required: true },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('SwapRequest', swapRequestSchema);
