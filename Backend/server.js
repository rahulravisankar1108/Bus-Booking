const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const BusRoute = require('./routes/BusRoutes');
const PassengerRoute = require('./routes/BookingRoutes');
const UserCredentialsRoute = require('./routes/CredentialsRoutes');
require('dotenv/config');

mongoose.connect(process.env.DATABASE_CONNECTION, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
});
const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
});

db.once('open', () => {
  console.log('Database Connected!');
});

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});

app.use('/api/Bus', BusRoute);
app.use('/api/Passenger', PassengerRoute);
app.use('/api/User', UserCredentialsRoute);

// 'mongodb+srv://Root:Lalitha1971@cluster0.pbo2x.mongodb.net/Bus Booking?retryWrites=true&w=majority'
// mongodb+srv://<username>:<password>@cluster0.efjlh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
