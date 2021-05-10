/* eslint-disable react/prop-types */
/* eslint-disable import/order */
import axios from 'axios';
import NavbarAdmin from './Navbar/Navbar';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';


const Close = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [Bus, setBus] = useState([]);
  const [Passenger, setPassenger] = useState({ PassName: '', PassAge: '', PassGender: '' });
  const [Loading, setLoading] = useState(false);

  const HandlePopUp = (PassName, PassAge, PassGender) => {
    const data = { PassName, PassAge, PassGender };
    setPassenger(data);
    setModalShow(true);
  };
  
  useEffect(() => {
    axios.get(`https://btsbus-booking.herokuapp.com/api/Bus/countTickets/${props.match.params.key.toString()}`).then((response) => {
      setBus(response.data.closed_Tickets);
      setLoading(true);
    });
  }, []);
  if (Loading) {
    if (Bus.length > 0) {
      return (
        <div>
          <NavbarAdmin />
          <Modal
            bsStyle="primary"
            style={{ opacity: 1 }}
            fade
            animation
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >

            <ModalHeader>
              <ModalTitle id="contained-modal-title-vcenter">
                <h4>Passenger Details</h4>
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              <table>
                <tbody>
                  <tr>
                    <th>Passenger Name</th>
                    <td>{Passenger.PassName}</td>
                  </tr>
                  <tr>
                    <th>Passenger Age</th>
                    <td>{Passenger.PassAge}</td>
                  </tr>
                  <tr>
                    <th>Passenger Gender</th>
                    <td>{Passenger.PassGender}</td>
                  </tr>
                </tbody>
              </table>
            </ModalBody>
            <ModalFooter>
              <Button
                style={{
                  color: 'white', backgroundColor: '#f1356d', borderRadius: '8px', padding: '10px', fontSize: '15px', fontWeight: 'bold', alignItems: 'left',
                }}
                onClick={() => { setModalShow(false); }}
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>
          <div className="content">
            <h1>Closed Seats</h1>
            <table style={{
              borderRadius: '8px', padding: '10px', width: '80px', margin: '10px', fontSize: '25px', fontWeight: 'bold',
            }}
            >
              <tr>
                <td><p style={{ marginRight: '100px' }}>Window</p></td>
                <td>
                  <p style={{ marginRight: '120px' }}>Aisle</p>
                  {' '}
                </td>
                <td><p style={{ marginRight: '130px' }}>Aisle</p></td>
                <td><p style={{ marginRight: '100px' }}>Window</p></td>
              </tr>
            </table>
            {Bus.map((value) => (
              <>
                <Button
                  style={{
                    borderRadius: '8px', padding: '10px', margin: '10px', marginRight: '120px', width: '80px', fontSize: '15px', fontWeight: 'bold',
                  }}
                  variant="outline-primary"
                  onClick={() => HandlePopUp(value.PassName, value.PassAge, value.PassGender)}
                >
                  {value.PassSeat}
                </Button>
              </>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div>
        <NavbarAdmin />
        <h1 style={{ textAlign: 'center' }}>-- All seats are OPEN --</h1>
      </div>
    );
  }

  return (
    <div />
  );
};

export default Close;
