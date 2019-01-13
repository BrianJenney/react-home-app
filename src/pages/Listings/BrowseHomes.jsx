import React from "react";
import NavBar from "../../components/BreadcrumbNav";
import MapWrapper from "./components/MapWrapper";
import UserSearch from "./components/Search";
import HousePics from "./components/HousePics";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as loginActions from "../../actions/login";
import * as logoutActions from "../../actions/logout";
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
                <MapWrapper />
                {/* <UserSearch /> */}
                <HousePics pics={this.props.properties} />
                <NavBar selectedIndex={2} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        id: state.loggedIn.id,
        email: state.loggedIn.name,
        properties: state.listings
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginaction: bindActionCreators(loginActions, dispatch),
        logoutaction: bindActionCreators(logoutActions, dispatch),
        listings: bindActionCreators(actions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrowseListings);
