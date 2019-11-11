import React from "react";
import NavBar from "../../components/BreadcrumbNav";
import MapWrapper from "./components/MapWrapper";
import UserSearch from "./components/Search";
import HousePics from "./components/HousePics";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./Listings.ducks";

class BrowseListings extends React.Component {
    componentWillUnmount = () => {
        const {
            listings: { removeMapMarkers }
        } = this.props;
        removeMapMarkers();
    };

    componentDidMount = () => {
        const {
            listings: { addMapMarker }
        } = this.props;

        addMapMarker();
    };

    render() {
        return (
            <div>
                {/* {TODO: add these back in when/if we decide to use google maps for search again} */}
                <MapWrapper />
                <UserSearch />
                <NavBar selectedIndex={2} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        properties: state.listings
    };
}

function mapDispatchToProps(dispatch) {
    return {
        listings: bindActionCreators(actions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrowseListings);
