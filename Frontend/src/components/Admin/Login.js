import './style.css';
import React from "react";
import Button from 'react-bootstrap/Button'
require('dotenv/config') 
export default class Login extends React.Component {
    LoginHandle = (e) => {
      e.preventDefault();
      
      if(this.refs.UserName.value.toString() === process.env.REACT_APP_ADUSERNAME && this.refs.Password.value === process.env.REACT_APP_ADPASSWORD) {
          window.location.href='/ViewBus';
      }
      else {
          window.location.href='/Admin';
      }
    }
    render() {
        return (
            <div>
                <nav className="navbar">
                    <h1>Admin Login</h1>
                </nav>
                <div className="content">
                    <table>
                        <tr>
                            <td>User Name</td>
                            <td> <input type="text" name="UserName" ref="UserName"/></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td> <input type="password" name="Password" ref="Password"/></td>
                        </tr>
                        <tr aria-colspan="2">
                            <td><Button type="submit" onClick={this.LoginHandle}>Login</Button></td>
                        </tr>
                    </table>
                </div>
            </div>
            
            
        );
    }
}