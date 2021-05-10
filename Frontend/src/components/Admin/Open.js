import axios from 'axios';
import './style.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import NavbarAdmin from './Navbar/Navbar';

const Open = (props) => {
  const [Bus, setBus] = useState([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    axios.get(`https://btsbus-booking.herokuapp.com/api/Bus/countTickets/${props.match.params.key.toString()}`).then((response) => {
      setBus(response.data.open_Tickets);
      setLoading(true);
    });
  }, []);
  if (Loading) {
    if (Bus.length > 0) {
      return (
        <div>
          <NavbarAdmin />
          <div className="content">
            <h1>Open Seats</h1>
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
                >
                  {value}
                </Button>
              </>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>-- All Seats are CLOSED --</h1>
      </div>
    );
  }

  return (
    <div>
      Error
    </div>
  );
};

export default Open;
