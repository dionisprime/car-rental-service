const mongoose = require('../dbConnect.js');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  roles: {
    type: Array,
    required: true,
  },
  activeRents: [{ type: 'ObjectId', ref: 'Rent' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
