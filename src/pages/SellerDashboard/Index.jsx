import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as loginActions from "../../actions/login";
import * as logoutActions from "../../actions/logout";
import "../../styles/dashboard.css";
import TopNav from "../../components/TopNav";
import NavBar from "../../components/BreadcrumbNav";
import Messages from "./components/Messages";
import DisclosureAgreement from "./components/DisclosureAgreement";
import ListHome from "./components/ListHome";
import Offers from "./components/Offers";
import ContractCompletion from "./components/ContractCompletion";
import { withRouter } from "react-router";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { userType } = this.props;
        return (
            <div>
                <TopNav />
                <div className="container dashboard w-80 h-100">
                    <h1>Dashboard</h1>
                    <ListHome userEmail={this.props.email} />
                    <DisclosureAgreement userEmail={this.props.email} />
                    <Messages userEmail={this.props.email} />
                    <Offers user={this.props.user} />
                    <ContractCompletion user={this.props.user} />
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
)(Dashboard);