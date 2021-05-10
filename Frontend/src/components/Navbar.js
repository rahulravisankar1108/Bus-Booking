/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
  const handleHome = () => {
    window.location.href = '/Home';
  };
  const handleProfile = () => {
    window.location.href = '/Profile';
  };
  const handleCart = () => {
    window.location.href = '/MyBookings';
  };
  const handleLogOut = () => {
    sessionStorage.clear();
    setModalShow(true);
  };
  const handleLogOutt = () => {
    setModalShow(false);
    window.location.href = '/Login';
  };
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Navbar sticky="top" className="navbar justify-content-end">
        <h1>Bus Booking</h1>
        <div className="links">
          <button type="button" onClick={handleHome}>Home</button>
          <button type="button" onClick={handleProfile}>User Profile</button>
          <button type="button" onClick={handleCart}>View Cart</button>
          <button type="button" onClick={handleLogOut}>LogOut</button>
        </div>
      </Navbar>
      <Modal
        show={modalShow}
        backdrop="static"
        keyboard={false}
        fade
        animation
      >
        <Modal.Header>
          <Modal.Title>LogOut</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thanks for your time!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleLogOutt}>Ok</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};



export default NavBar;
