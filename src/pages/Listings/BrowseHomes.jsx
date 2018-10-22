import React from "react";

import NavBar from "../../components/BreadcrumbNav";
import MapWrapper from "./components/MapWrapper";
import UserSearch from "./components/Search";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as loginActions from "../../actions/login";
import * as logoutActions from "../../actions/logout";
import * as mapActions from "../../actions/mapMarker";

class BrowseListings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            houses: [],
            open: false,
            picID: "",
            messages: []
        };
    }

    render() {
        return (
            <div>
                <MapWrapper />
                <UserSearch />
                <NavBar
                    onclick={this.props.mapActions.removeMapMarkers}
                    selectedIndex={2}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        id: state.loggedIn.id,
        email: state.loggedIn.name
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginaction: bindActionCreators(loginActions, dispatch),
        logoutaction: bindActionCreators(logoutActions, dispatch),
        mapActions: bindActionCreators(mapActions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrowseListings);
