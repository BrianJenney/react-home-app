import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as loginActions from "../../actions/login";
import * as logoutActions from "../../actions/logout";
import API from "../../api/helpers";
import TopNav from "../../components/TopNav";
import NavBar from "../../components/BreadcrumbNav";
class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offers: []
        };
    }

    componentDidMount = () => {
        API.getOfferByUser(this.props.user.user._id);
    };

    render() {
        return (
            <div>
                <TopNav />
                <h1>Offers</h1>
                <NavBar />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        id: state.loggedIn.id,
        email: state.loggedIn.name,
        user: state.loggedIn.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginaction: bindActionCreators(loginActions, dispatch),
        logoutaction: bindActionCreators(logoutActions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
