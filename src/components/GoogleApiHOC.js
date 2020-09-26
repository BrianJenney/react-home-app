import { GoogleApiWrapper } from 'google-maps-react';

const GoogleApiHOC = (Component) => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;
    return GoogleApiWrapper({
        apiKey,
    })(Component);
};

export default GoogleApiHOC;
