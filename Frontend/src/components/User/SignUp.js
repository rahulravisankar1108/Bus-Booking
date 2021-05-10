/* eslint-disable max-len */
import '../../index.css';
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UserSignUp = () => {
  const [State, setState] = useState({
    Email: '',
    Name: '',
    Password: '',
    Phone: 0,
    Address: '',
    City: '',
    Pincode: 0,
  });

  const handleChangeEmail = (event) => {
    setState({
      ...State, Email : event.target.value
    })
  };
  const handleChangeName = (event) => {
    setState({
      Email: State.Email, Name: event.target.value, Password: State.Password, Phone: State.Phone, Address: State.Address, City: State.City, Pincode: State.Pincode,
    });
  };
  const handleChangePassword = (event) => {
    setState({
      Email: State.Email, Name: State.Name, Password: event.target.value, Phone: State.Phone, Address: State.Address, City: State.City, Pincode: State.Pincode,
    });
  };
  const handleChangePhone = (event) => {
    setState({
      Email: State.Email, Name: State.Name, Password: State.Password, Phone: event.target.value, Address: State.Address, City: State.City, Pincode: State.Pincode,
    });
  };
  const handleChangeAddress = (event) => {
    setState({
      Email: State.Email, Name: State.Name, Password: State.Password, Phone: State.Phone, Address: event.target.value, City: State.City, Pincode: State.Pincode,
    });
  };
  const handleChangeCity = (event) => {
    setState({
      Email: State.Email, Name: State.Name, Password: State.Password, Phone: State.Phone, Address: State.Address, City: event.target.value, Pincode: State.Pincode,
    });
  };
  const handleChangePincode = (event) => {
    setState({
      Email: State.Email, Name: State.Name, Password: State.Password, Phone: State.Phone, Address: State.Address, City: State.City, Pincode: event.target.value,
    });
  };
  const [modalShow, setmodalShow] = useState(false);
  const handleLogIn = () => {
    setmodalShow(false);
    window.location.href = '/Login';
  };
  const signUpHandle = (event) => {
    event.preventDefault();
    const Data = {
      Email: State.Email, Name: State.Name, Password: State.Password, Phone: State.Phone, Address: State.Address, City: State.Address, Pincode: State.Pincode,
    };
    axios.post('https://btsbus-booking.herokuapp.com/api/User/SignUp', Data).then(() => {
      setmodalShow(true);
    });
  };
  return (
    <div>
      <nav className="navbar">
        <h1>Sign Up</h1>
      </nav>
      <Modal
        show={modalShow}
        backdrop="static"
        keyboard={false}
        fade
        animation
      >
        <Modal.Header>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are signed up Successfully!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleLogIn}>Ok</Button>
        </Modal.Footer>
      </Modal>
      <div className="content">
        <table>
          <tr>
            <td>Email</td>
            <td>
              {' '}
              <input type="email" name="Email" value={State.Email} onChange={(e) => handleChangeEmail(e)} />
            </td>
          </tr>
          <tr>
            <td>User Name</td>
            <td>
              {' '}
              <input type="text" name="Name" value={State.Name} onChange={(e) => handleChangeName(e)} />
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              {' '}
              <input type="password" name="Password" value={State.Password} onChange={(e) => handleChangePassword(e)} />
            </td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>
              {' '}
              <input type="tel" name="Phone" value={State.Phone} onChange={(e) => handleChangePhone(e)} />
            </td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              {' '}
              <input type="text" name="Address" value={State.Address} onChange={(e) => handleChangeAddress(e)} />
            </td>
          </tr>
          <tr>
            <td>City</td>
            <td>
              {' '}
              <input type="text" name="City" value={State.City} onChange={(e) => handleChangeCity(e)} />
            </td>
          </tr>
          <tr>
            <td>Pincode</td>
            <td>
              {' '}
              <input type="number" name="Pincode" value={State.Pincode} onChange={(e) => handleChangePincode(e)} />
            </td>
          </tr>
          <tr aria-colspan="2">
            <td><Button type="submit" onClick={(e) => signUpHandle(e)}>Sign Up</Button></td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default UserSignUp;
