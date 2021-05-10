/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
/* eslint-disable no-plusplus */
const Bus = require('../models/Bus');
const Passenger = require('../models/passenger');
require('dotenv/config');

const index = (req, res) => {
  Bus.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch(() => {
      res.json({
        message: 'An Error Occured',
      });
    });
};

const show = (req, res) => {
  const { BusID } = req.params;
  Bus.findById(BusID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch(() => {
      res.json({
        message: 'An Error Occured',
      });
    });
};

const store = (req, res) => {
  const arr = [
    {
      name: 1,
      status: 'Open',
    },
    {
      name: 2,
      status: 'Open',
    },
    {
      name: 3,
      status: 'Open',
    },
    {
      name: 4,
      status: 'Open',
    },
    {
      name: 5,
      status: 'Open',
    },
    {
      name: 6,
      status: 'Open',
    },
    {
      name: 7,
      status: 'Open',
    },
    {
      name: 8,
      status: 'Open',
    },
    {
      name: 9,
      status: 'Open',
    },
    {
      name: 10,
      status: 'Open',
    },
    {
      name: 11,
      status: 'Open',
    },
    {
      name: 12,
      status: 'Open',
    },
    {
      name: 13,
      status: 'Open',
    },
    {
      name: 14,
      status: 'Open',
    },
    {
      name: 15,
      status: 'Open',
    },
    {
      name: 16,
      status: 'Open',
    },
    {
      name: 17,
      status: 'Open',
    },
    {
      name: 18,
      status: 'Open',
    },
    {
      name: 19,
      status: 'Open',
    },
    {
      name: 20,
      status: 'Open',
    },
    {
      name: 21,
      status: 'Open',
    },
    {
      name: 22,
      status: 'Open',
    },
    {
      name: 23,
      status: 'Open',
    },
    {
      name: 24,
      status: 'Open',
    },
    {
      name: 25,
      status: 'Open',
    },
    {
      name: 26,
      status: 'Open',
    },
    {
      name: 27,
      status: 'Open',
    },
    {
      name: 28,
      status: 'Open',
    },
    {
      name: 29,
      status: 'Open',
    },
    {
      name: 30,
      status: 'Open',
    },
    {
      name: 31,
      status: 'Open',
    },
    {
      name: 32,
      status: 'Open',
    },
    {
      name: 33,
      status: 'Open',
    },
    {
      name: 34,
      status: 'Open',
    },
    {
      name: 35,
      status: 'Open',
    },
    {
      name: 36,
      status: 'Open',
    },
    {
      name: 37,
      status: 'Open',
    },
    {
      name: 38,
      status: 'Open',
    },
    {
      name: 39,
      status: 'Open',
    },
    {
      name: 40,
      status: 'Open',
    },

  ];
  const bus = new Bus({
    BusName: req.body.BusName,
    BusType: req.body.BusType,
    BusStartTiming: req.body.BusStartTiming,
    BusEndTiming: req.body.BusEndTiming,
    BusDate: req.body.BusDate,
    BusSource: req.body.BusSource,
    BusDestination: req.body.BusDestination,
    BusFeatures: req.body.BusFeatures,
    BusSeats: req.body.BusSeats,
    BusFare: req.body.BusFare,
    IsBooked: arr,
  });
  bus.save()
    .then(() => {
      res.json({
        message: 'Bus added Succesfully!',
      });
    })
    .catch(() => {
      res.json({
        message: 'Bus Couldnt save',
      });
    });
};

const update = (req, res) => {
  const BusID = req.body.BusID;

  const updatedData = {
    BusName: req.body.BusName,
    BusType: req.body.BusType,
    BusStartTiming: req.body.BusStartTiming,
    BusEndTiming: req.body.BusEndTiming,
    BusDate: req.body.BusDate,
    BusSource: req.body.BusSource,
    BusDestination: req.body.BusDestination,
    BusFeatures: req.body.BusFeatures,
    BusSeats: req.body.BusSeats,
    BusFare: req.body.BusFare,
  };

  Bus.findByIdAndUpdate(BusID, { $set: updatedData }, { new: true })
    .then(() => {
      res.json({
        message: 'Bus Details Updated!',
      });
    })
    .catch(() => {
      res.json({
        message: 'Bus detail Updation Error',
      });
    });
};

const destroy = (req, res) => {
  const BusID = req.params.BusID;
  Bus.findByIdAndRemove(BusID)
    .then(() => {
      Passenger.deleteMany({ BusID: BusID });
      res.json({
        message: 'Bus Deleted Succesfully',
      });
    })
    .catch(() => {
      res.json({
        message: 'Bus Deletion Error Occured',
      });
    });
};

const countTickets = (req, res) => {
  const busID = req.params.BusID;
  Bus.findById(busID)
    .then((response) => {
      const arr = response.IsBooked;
      let j = 0;
      const openTickets = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].status === 'Open') {
          openTickets[j] = arr[i].name;
          j += 1;
        }
      }
      Passenger.find({ BusID: busID })
        .then((responsee) => {
          const closeTickets = responsee;

          res.json({
            open_Tickets: openTickets,
            closed_Tickets: closeTickets,
          });
        });
    })
    .catch(() => {
      res.json({
        message: 'Bus finding error',
      });
    });
};
const clear = (req, res) => {
  const busID = req.params.BusID;

  Bus.findById(busID)
    .then((response) => {
      const BusArray = response.IsBooked;
      for (let i = 0; i < BusArray.length; i++) {
        if (BusArray[i].status === 'closed') {
          BusArray[i].status = 'Open';
        }
      }
      const updateddata = {
        IsBooked: BusArray,
      };
      Bus.findByIdAndUpdate(busID, { $set: updateddata }, { new: true })
        .then(() => {
          res.json({
            message: 'IsBooked updated Successfully',
          });
        })
        .catch(() => {
          res.json({
            message: 'Error updating the IsBooked!',
          });
        });
      const BS = response.BusSeats;
      const ctn = 40 - BS;
      const updatedData = {
        BusSeats: BS + ctn,
      };
      Bus.findByIdAndUpdate(busID, { $set: updatedData }, { new: true })
        .then(() => {
          res.json({
            message: 'Bus Truncated Successfully',
          });
        })
        .catch(() => {
          res.json({
            message: 'Error updating the number of seats!',
          });
        });
      Passenger.deleteMany({ BusID: busID })
        .then(() => {
          res.json({
            message: 'Passenger Truncated Successfully',
          });
        });
    })
    .catch(() => {
      res.json({
        message: 'Bus Truncation error',
      });
    });
};

module.exports = {
  index, show, store, update, destroy, clear, countTickets,
};
