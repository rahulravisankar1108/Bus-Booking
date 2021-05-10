import '../../index.css';
import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const UserLogin = () => {
  const [State, setState] = useState({
    Name: '',
    Password: '',
  });
  const handleChangeName = (event) => {
    setState({ Name: event.target.value, Password: State.Password });
  };
  const handleChangePassword = (event) => {
    setState({ Name: State.Name, Password: event.target.value });
  };
  const [modalShow, setmodalShow] = useState(false);
  const [ShowModal, setShowModal] = useState(false);
  const LoginHandle = (event) => {
    event.preventDefault();
    const Data = { Name: State.Name, Password: State.Password };
    axios.post('https://btsbus-booking.herokuapp.com/api/User/Login', Data)
      .then((response) => {
        if (response.data.res === true) {
          setmodalShow(true);
          // eslint-disable-next-line no-underscore-dangle
          sessionStorage.setItem('UserID', response.data.response._id);
        } else {
          setShowModal(true);
        }
      });
  };
  const SignUpHandle = () => {
    window.location.href = '/SignUp';
  };
  const handlelogin = () => {
    setmodalShow(false);
    window.location.href = '/Home';
  };
  const handleIncorrectLogin = () => {
    setShowModal(false);
    window.location.href = '/SignUp';
  };
  return (
    <div>
      <nav className="navbar">
        <h1>Login</h1>
      </nav>
      <Modal
        show={modalShow}
        backdrop="static"
        keyboard={false}
        fade
        animation
      >
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are logged in Successfully!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handlelogin}>Ok</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={ShowModal}
        backdrop="static"
        keyboard={false}
        fade
        animation
      >
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have not logged yet!
          Login to continue!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleIncorrectLogin}>Ok</Button>
        </Modal.Footer>
      </Modal>
      <div className="content">
        <table>
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
            <tr>
              <td><Button type="button" onClick={SignUpHandle}>Sign Up</Button></td>
            </tr>
            
            <td><Button type="submit" onClick={LoginHandle}>Login</Button></td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default UserLogin;
