/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import './style.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
const View = (props) => {
  const [Loading, setLoading] = useState(false);

  const [modalShow, setmodalShow] = useState(false);
  const [ShowDelete, setShowDelete] = useState(false);
  const [ShowTruncate, setShowTruncate] = useState(false);
  const [Bus, setBus] = useState([]);
  useEffect(() => {
    axios.get('https://btsbus-booking.herokuapp.com/api/Bus').then((response) => {
      setBus(response.data);
      setLoading(true);
    });
  }, []);

  const handleDelete = (BusID) => {
    axios.get(`https://btsbus-booking.herokuapp.com/api/Bus/delete/${BusID}`)
      .then((response) => {
        if (response) {
          setShowDelete(true);
        } else {
          props.history.push('/ViewBus');
        }
      });

  };
  const handleUpdate = (BusID) => {
    window.location.href = `/UpdateBus/${BusID}`;

  };
  const handleViewOpenSeats = (BusID) => {
    window.location.href = `/OpenSeats/${BusID}`;

  };
  const handleViewClosedSeats = (BusID) => {
    window.location.href = `/ClosedSeats/${BusID}`;

  };
  const handleTruncateBus = (BusID) => {
    axios.get(`https://btsbus-booking.herokuapp.com/api/Bus/clear/${BusID}`)
    .then((response) => {
      if (response) {
        setShowTruncate(true);
      } 
    });

  };
  const handleLogOut = () => {
    setmodalShow(false);
    setLoading(false);
    props.history.push('/Admin');
  };

  const handleAfterDelete = () => {
    setShowDelete(false);
    props.history.push('/ViewBus');
  };

  const handleAfterTruncate = () => {
    setShowTruncate(false);
    props.history.push('/ViewBus');
  };

  const LogOutFun = () => {
    setmodalShow(true);
  };
  const AddBus = () => {
    window.location.href = '/AddBus';
  };
  
  if (Loading) {
    return (
      <>
        <Modal
          show={ShowTruncate}
          backdrop="static"
          keyboard={false}
          fade
          animation
        >
          <Modal.Header>
            <Modal.Title>Bus Truncate</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bus Truncate Successfully!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={() =>{handleAfterTruncate()}}>Ok</Button>
          </Modal.Footer>
        </Modal>

        <Navbar sticky="top" className="navbar justify-content-end">
          <h1>Welcome Admin</h1>
          <div className="links">
            <button onClick={AddBus}>Add new Bus</button>
            <button onClick={LogOutFun}>LogOut</button>
          </div>
        </Navbar>
        <Modal
          show={modalShow}
          onHide={() => setmodalShow(false)}
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

        <Modal
          show={ShowDelete}
          onHide={() => setShowDelete(false)}
          backdrop="static"
          keyboard={false}
          fade
          animation
        >
          <Modal.Header>
            <Modal.Title>Bus Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bus Deleted Successfully!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleAfterDelete}>Ok</Button>
          </Modal.Footer>
        </Modal>

        <div className="App">
          <div className="content">
            {Bus.response.map((value) => (
              <div className="home">
                <table>
                  <tr style={{
                    padding: '20px',
                  }}
                  >
                    <td>Bus Name</td>
                    <td>{value.BusName}</td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    <td>{value.BusType}</td>
                  </tr>
                  <tr>
                    <td>Source Timing</td>
                    <td>{value.BusStartTiming}</td>
                  </tr>
                  <tr>
                    <td>Destination Timing</td>
                    <td>
                      {value.BusEndTiming}
                      {' '}
                    </td>
                  </tr>
                  <tr>
                    <td>Date Of Running</td>
                    <td>{value.BusDate}</td>
                  </tr>
                  <tr>
                    <td>Source</td>
                    <td>{value.BusSource}</td>
                  </tr>
                  <tr>
                    <td>Destination</td>
                    <td>
                      {value.BusDestination}
                      {' '}
                    </td>
                  </tr>
                  <tr>
                    <td>Features</td>
                    <td>{value.BusFeatures}</td>
                  </tr>
                  <tr>
                    <td>Available Seats</td>
                    <td>{value.BusSeats}</td>
                  </tr>
                  <tr>
                    <td>Amount </td>
                    <td>
                      ₹
                      {value.BusFare}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Button onClick={() => handleUpdate(value._id)}>Update Bus</Button>
                      <Button onClick={() => handleDelete(value._id)}>Delete Bus</Button>
                    </td>
                    <td>
                      <Button onClick={() => handleViewOpenSeats(value._id)}>View Open Seats</Button>
                      <Button onClick={() => handleViewClosedSeats(value._id)}>View Closed Seats</Button>
                    </td>

                  </tr>
                  <tr>
                    <td><Button onClick={() => handleTruncateBus(value._id)}>Reset Bus</Button></td>
                  </tr>
                </table>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div />
  );
};

export default View;
