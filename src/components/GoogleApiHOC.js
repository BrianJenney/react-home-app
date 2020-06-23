import { GoogleApiWrapper } from 'google-maps-react';
import keys from '../../src/config';

const GoogleApiHOC = (Component) => {
	const ENV = process.env.NODE_ENV;
	const apiKey = ENV === 'production' ? process.env.GOOGLE_MAPS_KEY : keys.googleApiKey;
	return GoogleApiWrapper({
		apiKey
	})(Component);
};

export default GoogleApiHOC;
