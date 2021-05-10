const mongoose = require('mongoose');

const { Schema } = mongoose;

const BusSchema = Schema({
  BusName: {
    type: String,
  },
  BusType: {
    type: String,
  },
  BusStartTiming: {
    type: String,
  },
  BusEndTiming: {
    type: String,

  },
  BusDate: {
    type: String,
  },
  BusSource:
    {
      type: String,
    },
  BusDestination: {
    type: String,
  },
  BusFeatures: {
    type: String,
  },
  BusSeats: {
    type: Number,
  },
  BusFare: {
    type: Number,
  },
  IsBooked: {
    type: Array,
  },
});

const Bus = mongoose.model('Bus', BusSchema);
module.exports = Bus;
