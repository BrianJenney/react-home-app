import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';
import Store from './store';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//we import our component from our component folder to use here
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
import Wizard from './pages/Wizard/Wizard';
import BuyerWizard from './pages/BuyerWizard/BuyerWizard';
import ErrorBoundary from './ErrorBoundary';

import { saveState } from './actions/localstorage';
import throttle from 'lodash/throttle';

import './styles/global.css';

const StoreInstance = Store();

StoreInstance.subscribe(
	throttle(() => {
		saveState(StoreInstance.getState());
	}, 1000)
);

const user = StoreInstance.getState().auth;

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route {...rest} render={(props) => (user._id ? <Component {...props} user={user} /> : <Redirect to='/' />)} />
	);
};

ReactDOM.render(
	<MuiThemeProvider>
		<Provider store={StoreInstance}>
			<ErrorBoundary>
				<Router>
					<div>
						<Route exact path='/' component={SignIn} />
						<Route exact path='/sign-up' component={SignUp} />
						<PrivateRoute path='/addproperty' component={AddProperty} />
						<PrivateRoute path='/edit/property/:id' component={EditProperty} />
						<PrivateRoute path='/listings' component={Listings} />
						<PrivateRoute path='/property/:id' component={Property} />
						<PrivateRoute path='/messages' component={UserMessages} />
						<PrivateRoute
							path='/dashboard'
							component={user.hasCompletedWizard ? BuyerWizard : BuyerWizard}
						/>
						<PrivateRoute path='/buyerdashboard/:id?' component={BuyerDashboard} />
						<PrivateRoute path='/offeraccepted/:id' component={AcceptedOffer} />
					</div>
				</Router>
			</ErrorBoundary>
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('root')
);
