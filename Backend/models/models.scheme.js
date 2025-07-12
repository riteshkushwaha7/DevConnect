const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  profilePic: {
    type: String, 
    default: '',
  },

  skills: {
    type: [String], 
    default: [],
  },

  location: {
    type: String,
    default: '',
  },

  availability: {
    type: String,
    enum: ['weekdays', 'weekends'],
    required: true,
  },

  description: {
    type: String,
    default: '',
  },

  isPublic: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);
