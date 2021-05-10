const mongoose = require('mongoose');

const { Schema } = mongoose;

const PassSchema = Schema({
  PassName: {
    type: String,
  },
  PassAge: {
    type: Number,
  },
  PassGender: {
    type: String,
  },
  PassSeat: {
    type: Number,
  },
  BusID: {
    type: String,
    default: '',
  },
  UserID: {
    type: String,
    default: '',
  },
});

const Passenger = mongoose.model('Passenger', PassSchema);
module.exports = Passenger;
