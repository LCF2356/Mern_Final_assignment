const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  notes: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
