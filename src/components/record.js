import axios from "axios";
import React from "react";
import {Box, Button, Center, Table, Thead, Tbody, Tr, Td, Th, Input} from "@chakra-ui/react";

/* This component defines access to records (Password entries) stored in the vault. This needs to store state so it is a class ES6 component. Assuming the user is authenticated, 
this component allows fetching and displaying of password records. As of now, this is being used in the Vaults component. I will consider making this a seperately routable component 
once I have figured out how to decouple this from the Vault component */

class Record extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            pk: props.number,
            passwords: null,
        };
    }

    // Create a vault record by using auth token and obtained values from form.
    createRecord() {
        var url = "http://127.0.0.1:8000/records/";
        var sitename = document.getElementById('sitename').value;
        var password = document.getElementById('password').value;
        var request = axios.create({
            headers: {'Authorization': `Token ${localStorage.getItem('token')}`},
        });
        request.post(url, {'vault_name': this.state.name, 'sitename':sitename, 'password':password}).then((response) => {
            console.log(response);
        });
    }
    
    // Retrieve records to display in the rendered table.
    retrieveRecords() {
        var url = "http://127.0.0.1:8000/records/"+this.state.pk;
        var request = axios.create({
            headers: {'Authorization': `Token ${localStorage.getItem('token')}`},
        });
        request.get(url).then((response) => {
            console.log(response.data.passwords);
            if (response.data.passwords !== null) {
                this.setState({
                    passwords: response.data.passwords,
                });
            }
        });
    }

     render() {
        var passwds = null;
        if (this.state.passwords !== null) {
            passwds = this.state.passwords.map((record) => {
              // return a list of table rows (Tr (chakra-ui element)) to display in table.
                return(
                    <Tr>
                      <Td>{record.site_name}</Td>
                      <Td>{record.password}</Td>
                    </Tr>
                );
            });
        }
        
        return(
          <Center>
            <div>
              <Box>
                <Button onClick={() => this.retrieveRecords()} colorScheme="telegram" variant="solid" size="sm">
                  Retrieve
                </Button>
              <div id="passwords-table">
                <Table variant="simple" border="2px" padding="2px">
                  <Thead>
                  <Tr>
                    <Th>SiteName</Th>
                    <Th>Password</Th>
                  </Tr>
                  </Thead>
                  <Tbody>
                    {passwds}
                  </Tbody>
                </Table>
              </div>
              </Box><br />
              <Box>
                <form onSubmit={() => this.createRecord()}>
                  Sitename: <Input type="text" id="sitename" focusColor="lime" errorColor="red" /><br /><br />
                  Password: <Input type="text" id="password" focusColor="lime" errorColor="red" /><br /><br />
                  <Button type="submit" colorScheme="telegram" variant="solid" size="sm">Create Record</Button><br />
                </form>
              </Box>
            </div>
          </Center>
        );
     }
}

export default Record;
