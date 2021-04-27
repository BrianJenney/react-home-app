import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SignIn from './pages/Login/SignIn';
import SignUp from './pages/Registration/Registration';
import AddProperty from './pages/AddProperty/Index';
import EditProperty from './pages/EditProperty/Index';
import Listings from './pages/Listings/BrowseHomes';
import Property from './pages/Property/PropertyInfo';
import UserMessages from './pages/MyMessages/UserMessage';
import Dashboard from './pages/Dashboard/Index';
import BuyerDashboard from './pages/BuyerDashboard/Index';
import AcceptedOffer from './pages/OfferAccepted/Index';
import ErrorBoundary from './ErrorBoundary';
import withNavBar from './components/withNavBar';
import './styles/global.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = store.getState().auth;
    return (
        <Route
            {...rest}
            render={(props) =>
                user._id ? (
                    <Component {...props} user={user} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};

const ComponentWithNavBar = (Component) => withNavBar(Component);

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <ErrorBoundary>
                <Router>
                    <div>
                        <Route
                            exact
                            path="/"
                            component={ComponentWithNavBar(SignIn)}
                        />
                        <Route
                            exact
                            path="/sign-up"
                            component={ComponentWithNavBar(SignUp)}
                        />
                        <PrivateRoute
                            path="/addproperty"
                            component={ComponentWithNavBar(AddProperty)}
                        />
                        <PrivateRoute
                            path="/edit/property/:id"
                            component={ComponentWithNavBar(EditProperty)}
                        />
                        <PrivateRoute
                            path="/listings"
                            component={ComponentWithNavBar(Listings)}
                        />
                        <PrivateRoute
                            path="/property/:id"
                            component={ComponentWithNavBar(Property)}
                        />
                        <PrivateRoute
                            path="/messages"
                            component={ComponentWithNavBar(UserMessages)}
                        />
                        <PrivateRoute
                            path="/dashboard"
                            component={ComponentWithNavBar(Dashboard)}
                        />
                        <PrivateRoute
                            path="/buyerdashboard/:id?"
                            component={ComponentWithNavBar(BuyerDashboard)}
                        />
                        <PrivateRoute
                            path="/offeraccepted/:id"
                            component={ComponentWithNavBar(AcceptedOffer)}
                        />
                    </div>
                </Router>
            </ErrorBoundary>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
