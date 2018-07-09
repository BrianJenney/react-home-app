import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import Store from "./store";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

//we import our component from our component folder to use here
import SignIn from "./pages/Login/SignIn";
import AddProp from "./pages/AddProperty/AddProp";
import Nav from "./pages/Nav/NavPage";
import Listings from "./pages/Listings/BrowseHomes";
import Property from "./pages/Property/PropertyInfo";
import UserMessages from "./pages/MyMessages/UserMessage";
import Dashboard from "./pages/Dashboard/Index";

import { saveState } from "./actions/localstorage";
import throttle from "lodash/throttle";

import "./styles/global.css";

const StoreInstance = Store();

StoreInstance.subscribe(
    throttle(() => {
        saveState(StoreInstance.getState());
    }, 1000)
);

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={StoreInstance}>
            <Router>
                <div>
                    <Route exact path="/" component={SignIn} />
                    <Route path="/addproperty" component={AddProp} />
                    <Route path="/nav" component={Nav} />
                    <Route path="/listings" component={Listings} />
                    <Route path="/property/:id" component={Property} />
                    <Route path="/messages" component={UserMessages} />
                    <Route path="/dashboard" component={Dashboard} />
                </div>
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById("root")
);
