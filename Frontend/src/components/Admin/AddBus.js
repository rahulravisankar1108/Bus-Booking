/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/order
import NavbarAdmin from './Navbar/Navbar';
import React from 'react';
import axios from 'axios';
import './style.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export class AddBus extends React.Component {
  constructor() {
    super();
    this.state = {
      BusName: '',
      BusType: '',
      BusStartTiming: '',
      BusEndTiming: '',
      BusDate: '',
      BusSource: '',
      BusDestination: '',
      BusFeatures: '',
      BusSeats: 0,
      BusFare: 0,
    };
    this.handleChangeBusName = this.handleChangeBusName.bind(this);

    this.handleChangeBusType = this.handleChangeBusType.bind(this);

    this.handleChangeBusStartTiming = this.handleChangeBusStartTiming.bind(this);

    this.handleChangeBusEndTiming = this.handleChangeBusEndTiming.bind(this);

    this.handleChangeBusDate = this.handleChangeBusDate.bind(this);

    this.handleChangeBusSource = this.handleChangeBusSource.bind(this);

    this.handleChangeBusDestination = this.handleChangeBusDestination.bind(this);

    this.handleChangeBusFeatures = this.handleChangeBusFeatures.bind(this);

    this.handleChangeBusSeats = this.handleChangeBusSeats.bind(this);

    this.handleChangeBusFare = this.handleChangeBusFare.bind(this);

    this.submitAdminForm = this.submitAdminForm.bind(this);

    this.ModalStatus = this.ModalStatus.bind(this);
  }

  handleChangeBusName(e) {
    this.setState({ BusName: e.target.value });
  }

  handleChangeBusType(e) {
    this.setState({ BusType: e.target.value });
  }

  handleChangeBusStartTiming(e) {
    this.setState({ BusStartTiming: e.target.value });
  }

  handleChangeBusEndTiming(e) {
    this.setState({ BusEndTiming: e.target.value });
  }

  handleChangeBusDate(e) {
    this.setState({ BusDate: e.target.value });
  }

  handleChangeBusSource(e) {
    this.setState({ BusSource: e.target.value });
  }

  handleChangeBusDestination(e) {
    this.setState({ BusDestination: e.target.value });
  }

  handleChangeBusFeatures(e) {
    this.setState({ BusFeatures: e.target.value });
  }

  handleChangeBusSeats(e) {
    this.setState({ BusSeats: e.target.value });
  }

  handleChangeBusFare(e) {
    this.setState({ BusFare: e.target.value });
  }

  ModalStatus() {
    this.setState({ ShowModal: false });
    this.props.history.push('/ViewBus');
  }

  submitAdminForm(e) {
    e.preventDefault();

    const data = {

      BusName: this.state.BusName,
      BusType: this.state.BusType,
      BusStartTiming: this.state.BusStartTiming,
      BusEndTiming: this.state.BusEndTiming,
      BusDate: this.state.BusDate,
      BusSource: this.state.BusSource,
      BusDestination: this.state.BusDestination,
      BusFeatures: this.state.BusFeatures,
      BusSeats: this.state.BusSeats,
      BusFare: this.state.BusFare,

    };

    axios.post('https://btsbus-booking.herokuapp.com/api/Bus/store', data)
      .then((response) => {
        if (response) {
          this.setState({ ShowModal: true });
        } else {
          window.location.href = '/AddBus';
        }
      }).catch((error) => {
        // eslint-disable-next-line no-alert
        alert('error', error);
      });
  }

  render() {
    return (
      <div>
        <NavbarAdmin />
        <Modal
          bsStyle="primary"
          show={this.state.ShowModal}
          backdrop="static"
          keyboard={false}
          fade
          animation
        >
          <Modal.Header>
            <Modal.Title>Bus Details Add</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bus Added Successfully!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={this.ModalStatus}>Ok</Button>
          </Modal.Footer>
        </Modal>
        <div className="content">
          <form onSubmit={this.submitAdminForm} method="post">
            <table>
              <tr>
                <td>
                  {' '}
                  <label htmlFor="BusName">Bus Name</label>
                </td>
                <td>
                  {' '}
                  <input type="text" name="BusName" id="BusName" value={this.state.BusName} onChange={this.handleChangeBusName} />
                </td>
              </tr>
              <tr>
                <td>
                  {' '}
                  <label htmlFor="BusType">BusType</label>
                </td>
                <td>
                  <select name="BusType" id="BusType" value={this.state.BusType} onChange={this.handleChangeBusType}>
                    <option value="default">--Select the Type of Bus--</option>
                    <option value="AC Seater">AC Seater</option>
                    <option value="AC Sleeper">AC Sleeper</option>
                    <option value="Non-AC Seater">Non-AC Seater</option>
                    <option value="Non-AC Sleeper">Non-AC Sleeper</option>
                    <option value="AC Seater Cum Sleeper">AC Seater Cum Sleeper</option>
                    <option value="Non-AC Seater Cum Sleeper">Non-AC Seater Cum Sleeper</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  {' '}
                  <label htmlFor="BusStartTiming">Source Timing</label>
                </td>
                <td>
                  {' '}
                  <input type="time" name="BusStartTiming" id="BusStartTiming" value={this.state.BusStartTiming} onChange={this.handleChangeBusStartTiming} />
                </td>
              </tr>
              <tr>
                <td>
                  {' '}
                  <label htmlFor="BusEndTiming">Destination Time</label>
                </td>
                <td>
                  {' '}
                  <input type="time" name="BusEndTiming" id="BusEndTiming" value={this.state.BusEndTiming} onChange={this.handleChangeBusEndTiming} />
                </td>
              </tr>
              <tr>
                <td>
                  {' '}
                  <label htmlFor="BusDate">Date of Running</label>
                </td>
                <td>
                  {' '}
                  <input type="date" name="BusDate" id="BusDate" value={this.state.BusDate} onChange={this.handleChangeBusDate} />
                </td>
              </tr>
              <tr>
                <td>
                  {' '}
                  <label htmlFor="BusSource">Source</label>
                </td>
                <td>
                  {' '}
                  <input type="text" name="BusSource" id="BusSource" value={this.state.BusSource} onChange={this.handleChangeBusSource} />
                </td>
              </tr>
              <tr>
                <td>
                  {' '}
                  <label htmlFor="BusDestination">Destination</label>
                </td>
                <td>
                  {' '}
                  <input type="text" name="BusDestination" id="BusDestination" value={this.state.BusDestination} onChange={this.handleChangeBusDestination} />
                </td>
              </tr>
              <tr>
                <td>
                  {' '}
                  <label htmlFor="BusFeatures">Bus Features</label>
                </td>
                <td>
                  {' '}
                  <input type="text" name="BusFeatures" id="BusFeatures" value={this.state.BusFeatures} onChange={this.handleChangeBusFeatures} />
                </td>
              </tr>
              <tr>
                <td>
                  {' '}
                  <label htmlFor="BusSeats">Bus Seats</label>
                </td>
                <td>
                  {' '}
                  <input type="number" name="BusSeats" id="BusSeats" value={this.state.BusSeats} onChange={this.handleChangeBusSeats} />
                </td>
              </tr>
              <tr>
                <td>
                  {' '}
                  <label htmlFor="BusFare">Bus Fare</label>
                </td>
                <td>
                  {' '}
                  <input type="number" name="BusFare" id="BusFare" value={this.state.BusFare} onChange={this.handleChangeBusFare} />
                </td>
              </tr>
              <tr>
                <td>
                  {' '}
                  <button
                    type="submit"
                    style={{
                      color: 'white', backgroundColor: '#f1356d', borderRadius: '8px', padding: '10px', marginLeft: '250px', marginTop: '30px', width: '130px', fontSize: '15px', fontWeight: 'bold',
                    }}
                  >
                    Add Bus
                  </button>
                  {' '}
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    );
  }
}
