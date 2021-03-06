import React from 'react';
import MapWrapper from './components/MapWrapper';
import UserSearch from './components/Search';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './Listings.ducks';

class BrowseListings extends React.Component {
    componentWillUnmount = () => {
        const {
            listings: { removeMapMarkers },
        } = this.props;
        removeMapMarkers();
    };

    componentDidMount = () => {
        const {
            listings: { addMapMarker },
        } = this.props;

        //add map markers when user first enters
        //TODO: need to get geolocation info from user
        addMapMarker({});
    };

    render() {
        return (
            <div>
                <MapWrapper />
                <UserSearch />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        properties: state.listings,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        listings: bindActionCreators(actions, dispatch),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(BrowseListings);
