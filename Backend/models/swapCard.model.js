const mongoose = require('mongoose');

const swapCardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  skillsOffered: { type: [String], required: true },
  skillsWanted: { type: [String], required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('SwapCard', swapCardSchema);
