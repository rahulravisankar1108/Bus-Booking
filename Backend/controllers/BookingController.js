/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
/* eslint-disable radix */
const Passenger = require('../models/passenger');
const Bus = require('../models/Bus');

const Passindex = (req, res) => {
  Passenger.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch(() => {
      res.json({ message: 'An Error Occured' });
    });
};

const Passshow = (req, res) => {
  const PassID = req.body.PassID;
  Passenger.findById(PassID)
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

const Passstore = (req, res) => {
  const BusID = req.body.BusID;
  const PassSeats = req.body.PassSeat;
  const passenger = new Passenger({
    UserID: req.body.UserID,
    PassName: req.body.PassName,
    PassAge: req.body.PassAge,
    PassGender: req.body.PassGender,
    PassSeat: PassSeats,
    BusID: BusID,
  });

  Bus.findById(BusID)
    .then((response) => {
      passenger.save();
      const updatedData = {
        BusSeats: parseInt(response.BusSeats) - 1,
        'IsBooked.$.status': 'closed',
      };
      Bus.updateOne({ _id: BusID, 'IsBooked.name': parseInt(PassSeats) }, { $set: updatedData })
        .then(() => {
          res.json({
            message: 'Bus Details Updated!',
          });
        })
        .catch(() => {
          res.json({
            message: 'Bus Detail Updation Error',
          });
        });
    })
    .catch(() => {
      res.json({
        message: 'Error finding the bus',
      });
    });
};

const Passupdate = (req, res) => {
  const PassID = req.body.PassID;

  const updatedData = {
    PassName: req.body.PassName,
    PassAge: req.body.PassAge,
    PassGender: req.body.PassGender,
  };

  Passenger.findByIdAndUpdate(PassID, { $set: updatedData }, { new: true })
    .then(() => {
      res.json({
        message: 'Passenger Details Updated!',
      });
    })
    .catch(() => {
      res.json({
        message: 'Passenger detail Updation Error',
      });
    });
};

const Passdestroy = (req, res) => {
  const PassID = req.params.PassID;
  Passenger.findById(PassID)
    .then((response) => {
      const passSeats = response.PassSeat;
      const BusID = response.BusID;

      Bus.findById(BusID)
        .then((responsee) => {
          const updatedData = {
            BusSeats: responsee.BusSeats + 1,
            'IsBooked.$.status': 'Open',
          };
          Bus.updateOne({ _id: BusID, 'IsBooked.name': parseInt(passSeats) }, { $set: updatedData })
            .then(() => {
              Passenger.findByIdAndRemove(PassID)
                .then(() => {
                  res.json({
                    message: 'Passenger Deleted Succesfully',
                  });
                })
                .catch(() => {
                  res.json({
                    message: 'Passenger Deletion Error Occured',
                  });
                });
            });
        })
        .catch(() => {
          res.json({
            message: 'Error Finding Bus!',
          });
        });
    });
};
const PassClear = (req, res) => {
  Passenger.deleteMany({})
    .then(() => {
      res.json({
        message: 'all passengers cleared!',
      });
    });
};

module.exports = {
  Passindex, Passshow, Passstore, Passupdate, Passdestroy, PassClear,
};
