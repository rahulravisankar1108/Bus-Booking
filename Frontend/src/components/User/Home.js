/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/react-in-jsx-scope */
import '../../index.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from '../Navbar';

const Home = () => {
  const handleClick = (BusID) => {
    window.location.href = `/Booking/${BusID}`;
  };
  const [Bus, setBus] = useState([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    axios.get('https://btsbus-booking.herokuapp.com/api/Bus').then((response) => {
      setBus(response.data);
      setLoading(true);
    });
  }, []);
  if (Loading) {
    return (
      <div className="App">
        <Navbar />
        <div className="content">
          {Bus.response.map((value, key) => (
            <div className="home" key={key}>
              <table>
                <thead>
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

                  <tr aria-colspan="2">
                    <Button onClick={() => handleClick(value._id)}>Book Seats</Button>
                  </tr>
                </thead>
              </table>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div />
  );
};

export default Home;
