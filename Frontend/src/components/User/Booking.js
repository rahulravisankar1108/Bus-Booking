/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/sort-comp */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import '../../index.css';
import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Navbar from '../Navbar';
import _ from "lodash";
import Carousel from 'react-bootstrap/Carousel';
export class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PassName: [],
      PassAge: [],
      PassGender: [],
      PassSeat: [],
      BusID: '',
      Seats: [],
      ShowModal: false,
      ShowSuccess:false,
      SeatAlign: 0,
    };
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleChangePassName = this.handleChangePassName.bind(this);
    this.handleChangePassAge = this.handleChangePassAge.bind(this);
    this.handleChangePassGender = this.handleChangePassGender.bind(this);
    this.submitPassForm = this.submitPassForm.bind(this);
    this.currentSeat = this.currentSeat.bind(this);
  }

  handleChangePassName(index, text) {

    let arr = this.state.PassName
    arr[index] = text
    this.setState({ PassName: arr});
  }

  handleChangePassAge(index, text) {
    let arr = this.state.PassAge
    arr[index]=text
    this.setState({ PassAge: arr });
  }

  handleChangePassGender(index, text) {
    let arr = this.state.PassGender
    arr[index]=text
    this.setState({ PassGender: arr });
  }

  handleSuccess(e) {
    this.setState({ ShowSuccess:false});
    this.props.history.push('/MyBookings');
  }
  currentSeat(seatNo) {
    if(this.state.PassSeat.includes(seatNo)) {
      let arr=this.state.PassSeat
      arr.splice(arr.indexOf(seatNo),1)
      this.setState({ PassSeat:arr})
    }
    else {
      let arr=this.state.PassSeat
      arr.push(seatNo)
      this.setState({PassName : [...this.state.PassName,""], PassAge : [...this.state.PassAge, ""], PassGender : [...this.state.PassGender, ""]})
      this.setState({ PassSeat:arr})
    }
  }

  submitPassForm(e) {
    e.preventDefault();
    for(var i=0;i<this.state.PassSeat.length;i++) {
      const data = {
        BusID: this.props.match.params.key.toString(),
        UserID: sessionStorage.getItem('UserID'),
        PassName: this.state.PassName[i],
        PassAge: parseInt(this.state.PassAge[i]),
        PassGender: this.state.PassGender[i],
        PassSeat: parseInt(this.state.PassSeat[i]),
      };
      axios.post('https://btsbus-booking.herokuapp.com/api/Passenger/Passstore', data);
    }
    
    this.setState({ShowSuccess:true});
  }
  componentDidMount() {
    axios.get(`https://btsbus-booking.herokuapp.com/api/Bus/show/${this.props.match.params.key}`)
      .then((response) => {
        this.setState({ Seats: response.data.response.IsBooked });
      });
  }

  render() {
    return (
      <div className="App">
        <Modal
        show={this.state.ShowSuccess}
        backdrop="static"
        keyboard={false}
        fade
        animation
      >
        <Modal.Header>
          <Modal.Title>Seats</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your seats are Booked!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={e=>{this.handleSuccess(e)}}>Ok</Button>
        </Modal.Footer>
      </Modal>
        <Navbar />
        <Modal
          bsStyle="primary"
          style={{ opacity: 1 }}
          fade
          animation
          show={this.state.ShowModal}
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
            <Carousel>
            {this.state.PassSeat.map((item, index)=>{
              return  <Carousel.Item>
            <div className="container p-5">
              <div className="row mb-2">
                <div className="col">
                  <label htmlFor="SeatSelection">Selected Seat</label>
                </div>
                <div className="col">
                  <h4>{item}</h4>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col">
                  <label htmlFor="PassName">Passenger Name</label>
                </div>
                <div className="col">
                  <input type="text" name="PassName" id="PassName" value={this.state.PassName[index]} onChange={e=>this.handleChangePassName(index, e.target.value)} placeholder="Enter Passenger Name" />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col">
                  <label htmlFor="Age"> Age</label>
                </div>
                <div className="col">
                  <input type="number" name="PassAge" id="PassAge" value={this.state.PassAge[index]} onChange={e=>this.handleChangePassAge(index, e.target.value)} placeholder="Enter Age" />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col">
                  <label htmlFor="Gender">Gender </label>
                </div>
                <div className="col">
                  <select name="PassGender" id="PassGender" value={this.state.PassGender[index]} onChange={e=>this.handleChangePassGender(index, e.target.value)}>
                    <option value="default">--Select Gender--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="TG">Transgender</option>
                  </select>
                </div>
              </div>
                {index === this.state.PassSeat.length -1 && <div className="row">
                  <div className="col">
                    <td>
                      {' '}
                      <Button
                        type="submit"
                        onClick={(e) => this.submitPassForm(e)}
                        style={{
                          color: 'white', backgroundColor: '#f1356d', borderRadius: '8px', padding: '10px', marginLeft: '250px', marginTop: '30px', width: '130px', fontSize: '15px', fontWeight: 'bold',
                        }}
                        >
                        Confirm Seat
                      </Button>
                    </td>
                  </div>
                </div>}
                </div>
            </Carousel.Item>
            })}
        </Carousel>
             
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="warning"
              style={{
                borderRadius: '8px', padding: '10px', fontSize: '15px', fontWeight: 'bold',
              }}
              onClick={() => { this.setState({ ShowModal: false }); }}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <div className="content">
          <div className="Booking" style={{ alignItems: 'center', marginLeft: '100px' }}>
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
            {
                this.state.Seats.map((item) => (
                  <>

                    <Button
                      style={{
                        borderRadius: '8px', padding: '10px', margin: '10px', marginRight: '120px', width: '80px', fontSize: '15px', fontWeight: 'bold',backgroundColor : this.state.PassSeat.includes(item.name) ? "Green" : "#f1356d"
                      }}
                      variant="outline-primary"
                      onClick={() => this.currentSeat(item.name)}
                      disabled={item.status === 'closed'}
                    >
                      {item.name}
                    </Button>
                  </>
                ))
            }
            <Button disabled={_.isEmpty(this.state.PassSeat)} onClick={() => {this.setState({ShowModal:true})}}>Book Seats</Button>

          </div>
        </div>
      </div>
    );
  }
}
