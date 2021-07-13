import React from "react";
import {Link as link} from "react-router-dom";
import { Button, Box, Text, Flex, Spacer, Center, Square, Link } from "@chakra-ui/react";

/* This component merely defines the description to be displayed when passman is accessed. There is no inherent logic as such in this component. It does however include a link
to the auth component for accessing login from homepage. I have used several ChakraUI components here as well to beautify it. As you may notice, I am not exactly a UI designer :) */

class Description extends React.Component {
    render() {
      return (
          <div>
            <Box bg='#68fa99' opacity='100%' border="2px" borderColor='#000000' borderStyle='inset' boxShadow="dark-lg" p="6" rounded="md">
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
            <Center>
            <Text width="1500px" height="45px" bg="black" border="2px" borderRadius="5px">
              <Link as={link} to="/auth">
                <Button variant="solid" colorScheme="telegram">Login</Button>
              </Link>
            </Text>
            </Center><br />
            <Flex color="black" justify="center" direction="row">
            <Spacer />
              <Center w="800px" bg="white">
              <Text fontSize="3xl">
                 Written in a mix of Django, Django rest framework. The PassMan password manager encrypts your created passwords in a encrypted file in your host<br />
                 The file is not sent to any other computer or domains over the internet. The application is supposed to run on your host as a standalone application. <br /><br />
                 Please refer to my github repository to know more about the documentation about this.
              </Text>
              </Center>
              <Spacer />
            <Flex justify="flex-start" direction="column" align="center">
              <Square bg="#68faf1" width="600px" height="500px">
                <Text fontSize="2xl">
                  Steps to access the password Manager
                <ol>
                  <li> Download the application </li>
                  <li> Start the backend for API access </li>
                  <li> Start the frontend for access (Optional) </li>
                  <li> Access the backend through localhost:8000 </li>
                </ol>
              </Text>
              </Square>
            </Flex>
            </Flex>
            <Box bg='#fa6868' opacity='100%' boxShadow='dark-lg' p='6' rounded='md'>
              <footer>
                <center>
                  <b>Author:</b>Sharan Varma<br />
                  <b>Email:</b>sharanvarma0@gmail.com<br />
                  <b>Github:</b><a href="https://github.com/sharanvarma0">Here</a><br /><br />
                  Shoot me a mail or raise an issue in the github repo for this project.<br />
                </center>
              </footer>
            </Box>
          </div> 
      );
    }
}

export default Description;


        

