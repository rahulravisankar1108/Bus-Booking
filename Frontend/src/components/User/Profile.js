/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-len */
import Button from 'react-bootstrap/Button';
import '../../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Navbar from '../Navbar';

const Profile = (props) => {
  const UserID = sessionStorage.getItem('UserID');
  const [UserDetails, setUserDetails] = useState({
    Email: '',
    Name: '',
    Password: '',
    Phone: 0,
    Address: '',
    City: '',
    Pincode: 0,
  });
  const handleChangeEmail = (event) => {
    setUserDetails({
      Email: event.target.value, Name: UserDetails.Name, Password: UserDetails.Password, Phone: UserDetails.Phone, Address: UserDetails.Address, City: UserDetails.City, Pincode: UserDetails.Pincode,
    });
  };
  const handleChangeName = (event) => {
    setUserDetails({
      Email: UserDetails.Email, Name: event.target.value, Password: UserDetails.Password, Phone: UserDetails.Phone, Address: UserDetails.Address, City: UserDetails.City, Pincode: UserDetails.Pincode,
    });
  };
  const handleChangePassword = (event) => {
    setUserDetails({
      Email: UserDetails.Email, Name: UserDetails.Name, Password: event.target.value, Phone: UserDetails.Phone, Address: UserDetails.Address, City: UserDetails.City, Pincode: UserDetails.Pincode,
    });
  };
  const handleChangePhone = (event) => {
    setUserDetails({
      Email: UserDetails.Email, Name: UserDetails.Name, Password: UserDetails.Password, Phone: event.target.value, Address: UserDetails.Address, City: UserDetails.City, Pincode: UserDetails.Pincode,
    });
  };
  const handleChangeAddress = (event) => {
    setUserDetails({
      Email: UserDetails.Email, Name: UserDetails.Name, Password: UserDetails.Password, Phone: UserDetails.Phone, Address: event.target.value, City: UserDetails.City, Pincode: UserDetails.Pincode,
    });
  };
  const handleChangeCity = (event) => {
    setUserDetails({
      Email: UserDetails.Email, Name: UserDetails.Name, Password: UserDetails.Password, Phone: UserDetails.Phone, Address: UserDetails.Address, City: event.target.value, Pincode: UserDetails.Pincode,
    });
  };
  const handleChangePincode = (event) => {
    setUserDetails({
      Email: UserDetails.Email, Name: UserDetails.Name, Password: UserDetails.Password, Phone: UserDetails.Phone, Address: UserDetails.Address, City: UserDetails.City, Pincode: event.target.value,
    });
  };
  const [ModalShow, setModalShow] = useState(false);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    axios.get(`https://btsbus-booking.herokuapp.com/api/User/Profile/${UserID.toString()}`).then((response) => {
      setUserDetails(response.data.response);
      setLoading(true);
    });
  }, []);
  const handleBack = () => {
    props.history.push('/Home');
  };
  const handleUpdate = () => {
    setModalShow(true);
  };
  const HandleUpdateDetails = (e) => {
    e.preventDefault();
    const data = {
      UserID,
      Email: UserDetails.Email,
      Name: UserDetails.Name,
      Password: UserDetails.Password,
      Phone: UserDetails.Phone,
      Address: UserDetails.Address,
      City: UserDetails.City,
      Pincode: UserDetails.Pincode,
    };
    axios.put('https://btsbus-booking.herokuapp.com/api/User/Update', data)
      .then((response) => {
        if (response) {
          setModalShow(false);
          props.history.push('/Profile');
        }
      });
  };
  if (Loading) {
    return (
      <div>
        <Navbar />
        <Modal
          bsStyle="primary"
          style={{ opacity: 1 }}
          fade
          animation
          show={ModalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ModalHeader>
            <ModalTitle id="contained-modal-title-vcenter">
              <h4>Profile Detail Update</h4>
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <table>
              <tr>
                <td>Email</td>
                <td>
                  {' '}
                  <input type="email" name="Email" value={UserDetails.Email} onChange={(e) => handleChangeEmail(e)} />
                </td>
              </tr>
              <tr>
                <td>User Name</td>
                <td>
                  {' '}
                  <input type="text" name="Name" value={UserDetails.Name} onChange={(e) => handleChangeName(e)} />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td>
                  {' '}
                  <input type="text" name="Password" value={UserDetails.Password} onChange={(e) => handleChangePassword(e)} />
                </td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>
                  {' '}
                  <input type="tel" name="Phone" value={UserDetails.Phone} onChange={(e) => handleChangePhone(e)} />
                </td>
              </tr>
              <tr>
                <td>Address</td>
                <td>
                  {' '}
                  <input type="text" name="Address" value={UserDetails.Address} onChange={(e) => handleChangeAddress(e)} />
                </td>
              </tr>
              <tr>
                <td>City</td>
                <td>
                  {' '}
                  <input type="text" name="City" value={UserDetails.City} onChange={(e) => handleChangeCity(e)} />
                </td>
              </tr>
              <tr>
                <td>Pincode</td>
                <td>
                  {' '}
                  <input type="number" name="Pincode" value={UserDetails.Pincode} onChange={(e) => handleChangePincode(e)} />
                </td>
              </tr>
              <tr aria-colspan="2">
                <td>
                  <Button
                    style={{
                      color: 'white', backgroundColor: '#f1356d', borderRadius: '8px', margin: '20px', padding: '10px', fontSize: '15px', fontWeight: 'bold',
                    }}
                    onClick={(e) => HandleUpdateDetails(e)}
                  >
                    Update Details
                  </Button>
                </td>
              </tr>
            </table>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="warning"
              style={{
                borderRadius: '8px', padding: '10px', fontSize: '15px', fontWeight: 'bold',
              }}
              onClick={() => { setModalShow(false); }}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <div className="content" style={{ border: '1px solid gray' }}>
          <div className="row" style={{ borderCollapse: 'collapse' }}>
            <div className="col">Email</div>
            <div className="col">
              {UserDetails.Email}
              {' '}
            </div>
          </div>
          <div className="row">
            <div className="col">Name</div>
            <div className="col">
              {UserDetails.Name}
              {' '}
            </div>
          </div>
          <div className="row">
            <div className="col">Phone</div>
            <div className="col">
              {UserDetails.Phone}
              {' '}
            </div>
          </div>
          <div className="row">
            <div className="col">Address</div>
            <div className="col">{UserDetails.Address}</div>
          </div>
          <div className="row">
            <div className="col">City</div>
            <div className="col">
              {UserDetails.City}
              {' '}
            </div>
          </div>
          <div className="row">
            <div className="col">Pincode</div>
            <div className="col">
              {UserDetails.Pincode}
              {' '}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Button onClick={handleUpdate}>Update Details</Button>
              {' '}
            </div>
            <div className="col">
              <Button onClick={handleBack}>Back</Button>
              {' '}
            </div>
          </div>
        </div>
      </div>

    );
  }

  return (
    <div />
  );
};

export default Profile;
