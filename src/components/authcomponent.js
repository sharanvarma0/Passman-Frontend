/* The first section is importing all react modules. I have used chakra-ui for buttons and HTML elements so those have been imported as well */

import React from "react";
import axios from "axios";
import Register from "./registercomponent";
import {Link as link} from "react-router-dom";
import { Box, Button, Input, Badge, Link, Text, Center } from "@chakra-ui/react";
import {LockIcon} from "@chakra-ui/icons";
//import {url} from "./config.js";

function Form(props) {

    /* Event handler for when Form is submitted. This function component defines a form for users to enter authentication information. This is then used to create
    a JSON request. */

    function handle_submit(event) {
        event.preventDefault();
        var user = document.getElementById("username").value;
        var pwd = document.getElementById("password").value;
        props.auth(user, pwd);
    }
    
    return (
        <form onSubmit={handle_submit}>
            <b>Username</b>: <Input variant="outline" placeholder="username" id="username" size="md" isRequired="true" focusBorderColor="lime" errorBorderColor="red" maxWidth="50%"/><br /><br /> 
            <b>Password</b>: <Input variant="outline" placeholder="password" id="password" size="md" isRequired="true" focusBorderColor="lime" errorBorderColor="red" maxWidth="50%"/><br /><br />
            <Button colorScheme="telegram" size="md" variant="solid" type="submit">
              Submit
            </Button>
        </form>
    );
}

class AuthComponent extends React.Component {
    
    /* This defines the actual authentication component. The API for get/post requests used is axios. Rendering is conditional and checks if authentication is done before.
    The logic involves getting values from form elements and then posting it to the '/api-token-auth' endpoint in the passman-backend. If token returned is valid, It is stored in
    local store and used in subsequent requests. Might need to implement session store in the future. For now, in my tests this has worked fine */

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            token_obtained: false,
            tried: false,
            exists: false,
        };
    }

    authenticate(username, password) {
        const url = "http://127.0.0.1:8000/api-token-auth/";
        const data = {
            "username": username,
            "password": password,
        };

        // Construct JSON request and post to obtain API AUTH TOKEN.

        axios.post(url, data).then((response) => {
            localStorage.setItem('token', response.data.token);
            this.setState({ token_obtained: true, tried: true, exists: true,});
        }).catch((error) => {
            this.setState({
                token_obtained: false,
                tried: true,
                exists: false,
            });
        });
    }
    
    // If authentication successful, fetch user to display while rendering
    // Use localStorage API to store the API AUTH TOKEN for future requests. I assume I might move to sessionStorage sometime in the future

    fetch_user() {
        const instance = axios.create({
            'headers': {'Authorization': `Token ${localStorage.getItem('token')}`},
        });
        instance.get('http://127.0.0.1:8000/users/').then((response) => {
            localStorage.removeItem('user');
            localStorage.setItem('user', response.data.user);
            console.log(response.data.user);
        }).catch((error) => {
            console.log("Failure: Error Occurred");
        });
    }
    
    // Method to handle logout. The token is simply removed from localStorage so that the authentication is reset.
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            token_obtained: false,
        });
    }

    // The render method. A combination of elements from Chakra-UI to define schemes.
    render() {
        if ((this.state.exists === true) || (localStorage.getItem('user'))) {
            this.fetch_user();
            return (
                <div>
                  <Box bg="#68fa99" opacity="100%" border="2px" borderColor="#000000" borderStyle="inset" boxShadow="dark-lg" p="6" rounded="md">
                    <Text fontSize={30}>
                      <center>
                        <header>
                          <h1>PassMan</h1>
                          <h2>The password Manager for the paranoid</h2>
                        </header>
                      </center>
                    </Text>
                  </Box>
                  <br />
                  <center>
                    <Badge colorScheme="green" variant="solid">Success</Badge>
                    <h4>Welcome {localStorage.getItem('user')}</h4>
                      <Link colorScheme="telegram" as={link} to="/vaults/">
                      <Button variant="solid" colorScheme="telegram">
                        Vaults
                      </Button>
                      </Link>
                    <LockIcon />
                  </center>
                </div>
            );
        }
        else if ((this.state.tried === true) && (this.state.exists === false)) {
            return(
                <main>
                  <Box bg="#68fa99" opacity="100%" border="2px" borderStyle="inset" borderColor="#000000" boxShadow="dark-lg" p="6" rounded="md">
                    <Text fontSize={30}>
                      <center>
                        <header>
                          <h1>PassMan</h1>
                          <h2>The password Manager for the paranoid</h2>
                        </header>
                      </center>
                    </Text>
                  </Box>
                  <br />
                  <div className="LoginError">
                    The requested token was not found. The user does not exist. Please Register. <br /><br />
                  </div>
                  <Register />
                </main>
            );
        }

        return( 
            <main>
              <Box bg="#68fa99" opacity="100%" border="2px" borderStyle="inset" borderColor="#000000" boxShadow="dark-lg" p="6" rounded="md">
              <Text fontSize={30}>
                <center>
                  <header>
                    <h1>PassMan</h1>
                    <h2>The password Manager for the paranoid</h2>
                  </header>
                </center>
              </Text>
            </Box><br />
             <Center>
              <Form auth={(a,b) => this.authenticate(a,b)} />
             </Center>
            </main>
        );
    }
}

export default AuthComponent;
        
                
        
    
