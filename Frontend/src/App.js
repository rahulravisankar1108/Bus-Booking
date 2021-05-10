/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/named */
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/User/Home';
import { Booking } from './components/User/Booking';
import Admin from './components/Admin/Admin';
import { AddBus } from './components/Admin/AddBus';
import Open from './components/Admin/Open';
import Close from './components/Admin/Close';
import Truncate from './components/Admin/Truncate';
import { Update } from './components/Admin/Update';
import View from './components/Admin/View';
import User from './components/User/UserLogin';
import UserSignUp from './components/User/SignUp';
import Cart from './components/User/Cart';
import Profile from './components/User/Profile';

const App = () => (
  <Router>
    <Route path="/Home" exact component={Home} />
    <Route path="/Booking/:key" component={Booking} />
    <Route path="/UserLogin" component={User} />
    <Route path="/Admin" component={Admin} />
    <Route path="/AddBus" component={AddBus} />
    <Route path="/OpenSeats/:key" component={Open} />
    <Route path="/ClosedSeats/:key" component={Close} />
    <Route path="/TruncateBus/:key" component={Truncate} />
    <Route path="/UpdateBus/:key" component={Update} />
    <Route path="/ViewBus" component={View} />
    <Route path="/MyBookings" component={Cart} />
    <Route path="/Profile" component={Profile} />
    <Route path="/" exact component={User} />
    <Route path="/Login" exact component={User} />
    <Route path="/SignUp" component={UserSignUp} />
  </Router>
);

export default App;
