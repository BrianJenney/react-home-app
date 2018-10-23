import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as loginActions from "../../actions/login";
import * as logoutActions from "../../actions/logout";
import "../../styles/dashboard.css";
import TopNav from "../../components/TopNav";
import NavBar from "../../components/BreadcrumbNav";

class OfferAccepted extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <TopNav />
                <div className="container dashboard w-80 h-100">
                    <h1>Congratulations!</h1>
                    <p className="text-muted">Next Steps...</p>
                </div>
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
)(OfferAccepted);
