const User = require('../models/User');
const Passenger = require('../models/passenger');

const Login = (req, res) => {
  const { Name } = req.body;
  const { Password } = req.body;
  User.findOne({ Name, Password })
    .then((response) => {
      if (response != null) {
        res.json({
          res: true,
          response,
        });
      } else {
        res.json({
          res: false,
        });
      }
    })
    .catch(() => {
      res.json({
        message: 'An Error Occured',
      });
    });
};

const SignUp = (req, res) => {
  const New = new User({
    Email: req.body.Email,
    Name: req.body.Name,
    Password: req.body.Password,
    Phone: req.body.Phone,
    Address: req.body.Address,
    City: req.body.City,
    Pincode: req.body.Pincode,
  });
  New.save()
    .then(() => {
      res.json({
        message: 'New User Details Added!',
      });
    });
};

const ShowTickets = (req, res) => {
  const { UserID } = req.params;
  Passenger.find({ UserID })
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch(() => {
      res.json({
        message: 'Show Tickets Error Occured',
      });
    });
};

const Update = (req, res) => {
  const { UserID } = req.body;
  const UpdatedData = {
    Email: req.body.Email,
    Name: req.body.Name,
    Password: req.body.Password,
    Phone: req.body.Phone,
    Address: req.body.Address,
    City: req.body.City,
    Pincode: req.body.Pincode,
  };
  User.findByIdAndUpdate(UserID, { $set: UpdatedData }, { new: true })
    .then(() => {
      res.json({
        message: 'User Details Updated!',
      });
    })
    .catch(() => {
      res.json({
        message: 'User detail Updation Error',
      });
    });
};

const ShowUser = (req, res) => {
  const { UserID } = req.params;
  User.findById(UserID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch(() => {
      res.json({
        message: 'Show User Error Occured',
      });
    });
};

const Index = (req, res) => {
  User.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch(() => {
      res.json({ message: 'An Error Occured' });
    });
};

const Destroy = (req, res) => {
  const ID = req.params.UserID;
  User.findByIdAndRemove(ID)
    .then(() => {
      res.json({
        message: 'User Deleted Succesfully',
      });
    })
    .catch(() => {
      res.json({
        message: 'User Deletion Error Occured',
      });
    });
};

module.exports = {
  Login, SignUp, Index, Destroy, Update, ShowTickets, ShowUser,
};
