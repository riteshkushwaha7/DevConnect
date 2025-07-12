const mongoose = require('mongoose');
const skillValues = [
  'web_development',
  'graphic_design',
  'video_editing',
  'content_writing',
  'digital_marketing',
  'photography',
  'public_speaking',
  'data_analysis',
  'ui_ux_design',
  'app_development',
  'language_translation',
  'music_production',
  'cooking',
  'fitness_training',
  'yoga',
  'painting',
  'handicraft',
  'seo_expert',
  'career_counseling',
  'financial_planning'
];

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
    type: Buffer, 
    default: '',
  },

  profilePicType: {
  type: String,
  },

  skillsOffered: {
    type: [String], 
    enum: skillsValues,
    default: [],
  },
  skillsWanted: {
    type: [String], 
    enum: skillsValues,
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
userSchema.statics.hashedPassword = async(password)=>{
    return await bcrypt.hash(password,10)
}
userSchema.methods.generateAuthToken = async function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"24h"})
}
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}
module.exports = mongoose.model('user', userSchema);