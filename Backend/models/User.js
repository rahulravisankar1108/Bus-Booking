const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserDetailsSchema = Schema({
  Email: {
    type: String,
  },
  Name: {
    type: String,
  },
  Password: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Address: {
    type: String,
  },
  City: {
    type: String,
  },
  Pincode: {
    type: Number,
  },
});

const User = mongoose.model('UserLogin', UserDetailsSchema);
module.exports = User;
