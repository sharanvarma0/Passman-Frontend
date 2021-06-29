import React from "react";
import axios from "axios";
import Record from "./record";
import Form from "./form";
import {Box } from "@chakra-ui/react";

/* This file defines components for use in viewing and creating vaults. Vaults are files which store encrypted password data for the user. I have tried to abstract each complex 
action in a seperate component but some coupling still requires reusable components to be created. As of now, this is working and functional. Until I figure out something, this is 
what we have. */

// Function component to handle creation of a new vault. Uses auth token to POST request to the /vaults/ endpoint of the API with required parameters.
function VaultCreate(props) {
    var message = null;
    function handleClick(event) {
        event.preventDefault();
        var url = "http://127.0.0.1:8000/vaults/";
        var vault_name = document.getElementById('vault_name').value;
        var directory = document.getElementById('directory').value;
        var filename = document.getElementById('filename').value;
        var post_data = {"vault_name": vault_name, "directory": directory, "filename":filename};
        var request = axios.create({
            headers: {'Authorization': `Token ${localStorage.getItem('token')}`},
        });
        request.post(url, post_data).then((response) => {
            message = `Vault ${response.data.vault_name} created successfully`;
        });
    }
    return(
        <div>
          <Form message={message} field1="Vault Name" field2="Directory" field3="Filename" id1="vault_name" id2="directory" id3="filename" submitText="Create" handleSubmit={(e) => handleClick(e)} />
        </div>
    );
}
            
//The actual Vault component which needs to store several state variables to enable rendering
class Vault extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            vaults: [],
            records: [],
            obtained: false,
        };
    }

    // Fetch vaults for a particular user to list them. GET /vaults/ for the user.
    fetchVaults() {
        var url = "http://127.0.0.1:8000/records/";
        var token = localStorage.getItem('token');
        console.log(token);
        var request = axios.create({
            headers: {'Authorization': `Token ${token}`},
        });
        request.get(url).then((response) => {
            var struct = [];
            console.log(response);
            response.data.map((vault) => {
                return struct.push(vault);
            });
            this.setState({
                vaults: struct,
                obtained: true,
            });
        });
    }
    
    // Fetch records in the particular vault and return them. GET /records/<vault_primarykey> for the user.
    fetchRecords(number) {
        var url = "http://127.0.0.1:8000/records/"+number;
        var request = axios.create({
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
        });
        request.get(url).then((response) => {
            console.log(response.data);
            if (response.data.passwords === null) {
                this.setState({
                    records: null,
                });
            }
            this.setState({
                records: response.data.passwords,
            });
        });
    }


    render() {
        if (this.state.obtained === false) {
            this.fetchVaults();
        }
        if (this.state.vaults.length === 0) {
            return (
                <div>
                  <b>No Vaults Yet</b><br />
                  <b>Just create one</b>
                  <div align="right">
                    <VaultCreate />
                  </div>
                </div>
            );
        }
        const vault = this.state.vaults.map((vlt) => {
            return(
                <Box bg="#79a1f6" width="50%" height="50%">
                  {vlt.vault_name}
                  <Record number={vlt.number} name={vlt.vault_name} />
                </Box>

            );
        });

        return(
            <div>
              <ul>
                {vault}
              </ul>
            </div>
        );
              
    }
}

export default Vault;
