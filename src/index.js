import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import App from "./app";
import Vault from "./components/vault";
import AuthComponent from "./components/authcomponent";
import {ChakraProvider} from "@chakra-ui/react";

/* This index file just provides different routes to components. This is the origin point. Any new route in the web app must be defined here.
Do not forget to add route here when a new endpoint needs to be added to view a specific component in the future */

ReactDOM.render(
    <ChakraProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/auth" component={AuthComponent}></Route>
        <Route exact path="/vaults/" component={Vault}></Route>
      </Switch>
    </BrowserRouter>
    </ChakraProvider>,
    document.getElementById("root")
);
    
