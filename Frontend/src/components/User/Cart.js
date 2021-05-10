/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/react-in-jsx-scope */
import '../../index.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar';

const Cart = (props) => {
  const UserID = sessionStorage.getItem('UserID');
  const [Loading, setLoading] = useState(false);
  const [ShowModalUpdate,setShowModalUpdate]= useState(false);
  const [ShowModalDelete,setShowModalDelete]= useState(false);
  const [Name,setName]=useState();
  const [Age,setAge] = useState();
  const [Gender,setGender]=useState();
  const [Seat, setSeat]=useState();
  const [ID,setID]=useState();
  const [ShowSuccessUpdate,setShowSuccessUpdate]=useState(false);
  const [TravelDetails] = useState([]);
  
  useEffect(() => {
    axios.get('https://btsbus-booking.herokuapp.com/api/User/MyBooking/'+UserID.toString()).then((response) => {
      if (response) {
        response.data.response.map((value) => {
          axios.get('https://btsbus-booking.herokuapp.com/api/Bus/Show/'+value.BusID.toString())
          .then(responsee => {
              TravelDetails.push([responsee.data.response,value]);
          })
        })
        setLoading(true);
      } 
    });
  },[TravelDetails,UserID]); 
  
  const submitUpdateForm = () => {
    let data = {
      PassID : ID,
      PassName : Name,
      PassAge : Age,
      PassGender : Gender
    }
    axios.post('https://btsbus-booking.herokuapp.com/api/Passenger/Passupdate', data)
    .then(response => {
      if(response) {
        setShowSuccessUpdate(true);
      }
    })
  }

  const Update = (Name,Age,Gender,Seat,ID) => {
    setName(Name);
    setAge(Age);
    setGender(Gender);
    setSeat(Seat);
    setID(ID);
    setShowModalUpdate(true);
  }
  const Delete = (UserID) => {
    axios.get('https://btsbus-booking.herokuapp.com/api/Passenger/Passdelete/'+UserID)
    .then(response => { 
      if(response)
        setShowModalDelete(true);
    }) 

  }

  const handleAfterSuccess = () => {
    setShowSuccessUpdate(false);
    setShowModalUpdate(false);
    props.history.push('/MyBookings'); 
  }

  if (Loading) {
    console.log(TravelDetails);
    return (
      <div className="App">
        <Modal
        show={ShowModalDelete}
        backdrop="static"
        keyboard={false}
        fade
        animation
        >
          <Modal.Header>
            <Modal.Title>Deleted Seat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your seat is Deleted!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={()=>{setShowModalDelete(false);}}>Ok</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          bsStyle="primary"
          style={{ opacity: 1 }}
          fade
          animation={true}
          show={ShowModalUpdate}
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
            <div className="container" style={{backgroundColor : "rgba(0,0,0,0.2)"}}>
              <div className="container p-5">
                <div className="row mb-2"> 
                  <div className="col">
                    <label htmlFor="SeatSelection">Selected Seat</label>
                  </div>
                  <div className="col">
                    <h4>{Seat}</h4>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col">
                    <label htmlFor="PassName">Passenger Name</label>
                  </div>
                  <div className="col">
                    <input type="text" name="Name" id="Name" value={Name} onChange={e=>{setName(e.target.value)}} placeholder="Enter Passenger Name" />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col">
                    <label htmlFor="Age"> Age</label>
                  </div>
                  <div className="col">
                    <input type="number" name="Age" id="Age" value={Age} onChange={e=>{setAge(e.target.value)}} placeholder="Enter Age" />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col">
                    <label htmlFor="Gender">Gender </label>
                  </div>
                  <div className="col">
                    <select name="Gender" id="Gender" value={Gender} onChange={e=>{setGender(e.target.value)}}>
                      <option value="default">--Select Gender--</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="TG">Transgender</option>
                    </select>
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={submitUpdateForm}
                  style={{
                    color: 'white', backgroundColor: '#f1356d', borderRadius: '8px', padding: '10px', marginLeft: '250px', marginTop: '30px', width: '130px', fontSize: '15px', fontWeight: 'bold',
                  }}
                  >
                  Update Seat
                </Button>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="warning"
              style={{
                borderRadius: '8px', padding: '10px', fontSize: '15px', fontWeight: 'bold',
              }}
              onClick={() => { setShowModalUpdate(false); }}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>

        <Navbar />

        <Modal
        show={ShowSuccessUpdate}
        backdrop="static"
        keyboard={false}
        fade
        animation
        >
          <Modal.Header>
            <Modal.Title>Updated Seats</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your seats are Updated!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={()=>{handleAfterSuccess()}}>Ok</Button>
          </Modal.Footer>
        </Modal>

        {TravelDetails.map((value) => { 
          return (
            <div className="content" style={{ border: '2px solid gray'}}>
              <div className="container" style={{ borderCollapse: 'collapse' }}>
                <div className="row" style={{ borderCollapse: 'collapse' }}>
                  <div className="col">Passenger Details</div>
                  <div className="col">
                    <div className="row">
                      <div className="col"> Name</div>
                      <div className="col"> 
                        {value[1].PassName}
                        {' '}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col"> Age</div>
                      <div className="col">
                        {value[1].PassAge}
                        {' '}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col"> Gender</div>
                      <div className="col">
                        
                        {value[1].PassGender}
                        {' '}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col"> Seat Number</div>
                      <div className="col">
                        
                        {value[1].PassSeat}
                        {' '}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  
                  <h1 style={{ borderBottom: '4px solid gray' }} />
                  {' '}
                </div>
                <div className="row">
                  
                  <h1 style={{ borderBottom: '4px solid gray' }} />
                  {' '}
                </div>
                <div className="row">
                  <div className="col">Bus Details</div>
                  <div className="col">
                    <div className="row">
                      <div className="col">Name</div>
                      <div className="col">
                        {value[0].BusName}
                        {' '}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">Type</div>
                      <div className="col">
                        {value[0].BusType}
                        {' '}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">Source</div>
                      <div className="col">
                        {value[0].BusSource}
                        {' '}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">Destination</div>
                      <div className="col">
                        {value[0].BusDestination}
                        {' '}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">Start Timing</div>
                      <div className="col">
                        {value[0].BusStartTiming}
                        {' '}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">End Timing</div>
                      <div className="col">
                        {value[0].BusEndTiming}
                        {' '}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">Date of Journey</div>
                      <div className="col">
                        {value[0].BusDate}
                        {' '}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">Fare</div>
                      <div className="col">
                        {value[0].BusFare}
                        {' '}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <h1 style={{ borderBottom: '4px solid gray' }} />
                  {' '}
                </div>
                <div className="row">
                    <button type="button" onClick={() => {Update(value[1].PassName,value[1].PassAge,value[1].PassGender,value[1].PassSeat,value[1]._id)}}>Update Details</button>
                    <button type="button" onClick={() => {Delete(value[1]._id)}}>Delete</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="content">
      <h1 style={{ textAlign: 'center' }}> --Booking is empty-- </h1>
      <Button style={{ marginLeft: '450px', alignContent: 'center' }} onClick={() => { props.history.push('/Home'); }}>Back</Button>
    </div>
  );
};

export default Cart;
