import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import Store from "./store";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

//we import our component from our component folder to use here
import SignIn from "./pages/Login/SignIn";
import AddProperty from "./pages/AddProperty/Index";
import EditProperty from "./pages/EditProperty/Index";
import Listings from "./pages/Listings/BrowseHomes";
import Property from "./pages/Property/PropertyInfo";
import UserMessages from "./pages/MyMessages/UserMessage";
import Dashboard from "./pages/Dashboard/Index";
import BuyerDashboard from "./pages/BuyerDashboard/Index";

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
                    <Route path="/addproperty" component={AddProperty} />
                    <Route path="/edit/property/:id" component={EditProperty} />
                    <Route path="/listings" component={Listings} />
                    <Route path="/property/:id" component={Property} />
                    <Route path="/messages" component={UserMessages} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route
                        path="/buyerdashboard/:id?"
                        component={BuyerDashboard}
                    />
                </div>
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById("root")
);
