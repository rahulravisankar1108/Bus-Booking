/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-use-before-define */
import './NavStyle.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Navbar } from 'react-bootstrap';

const NavbarAdmin = () => {
  const LogOutFun = () => {
    setShowModal(true);
  };
  const handleLogOut = () => {
    setShowModal(false);
    window.location.href = '/Admin';
  };
  const ViewBus = () => {
    window.location.href = '/ViewBus';
  };
  const AddBus = () => {
    window.location.href = '/AddBus';
  };
  const [ShowModal, setShowModal] = useState(false);
  return (
    <>
      <Navbar sticky="top" className="navbar justify-content-end">
        <h1>Welcome Admin</h1>
        <div className="links">
          <button type="button" onClick={AddBus}>Add new Bus</button>
          <button type="button" onClick={ViewBus}>View Buses</button>
          <button type="button" onClick={LogOutFun}>LogOut</button>
        </div>
      </Navbar>
      <Modal
          show={ShowModal}
          backdrop="static"
          keyboard={false}
          fade
          animation
        >
          <Modal.Header>
            <Modal.Title>Admin LogOut</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Thanks for your time!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleLogOut}>Ok</Button>
          </Modal.Footer>
        </Modal>
    </>
  );
};

export default NavbarAdmin;
