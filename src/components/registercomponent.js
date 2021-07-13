import React from "react";
import axios from "axios";
import {Redirect} from "react-router-dom"; // The redirect is required for redirecting the user to another page

/* This register component defines a form for registering a new user into the passman backend API. The action undertaken is just posting new username and master password
values to the /users/ endpoint which executes the create() method in the viewset to create a new user */

class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            success: false,
        };
    }

    validate(event) {
        event.preventDefault(); // prevent default behavior on submit
        var pwd = document.getElementById('password').value;
        var conf_pwd = document.getElementById('conf-password').value;
        console.log(pwd); // this is just a debug message. Will be removed once the frontend is well tested and ready.
        if (pwd === conf_pwd) {
            var user = document.getElementById('username').value;
            var url = "http://127.0.0.1:8000/users/";
            axios.post(url, {'username':user, 'password':pwd}).then((response) => {
                console.log(response);
            });
        }
    }

    render() { 
        if (this.state.success) {
            return(
                <div>
                  <h3>Registration Successful</h3>
                  <Redirect to="/" />
                </div>
            );
        }
        return(
              <form onSubmit={(event) => this.validate(event)}>
                Username: <input type="text" id="username" /><br />
                Password: <input type="password" id="password" /><br />
                Confirm Password: <input type="password" id="conf-password" /><br />
                <button type="submit">Register</button>
              </form>
        );
    }
}

export default Register;



                
