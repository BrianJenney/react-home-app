import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as loginActions from "../../actions/login";
import * as logoutActions from "../../actions/logout";
import API from "../../api/helpers";
import TopNav from "../../components/TopNav";
import NavBar from "../../components/BreadcrumbNav";

import Messages from "./components/Messages";
import PurchaseAgreement from "./components/PurchaseAgreement";
import SubmitOffer from "./components/SubmitOffer";
import Financing from "./components/Financing";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            property: null,
            currentHouse: null,
            open: false,
            user: null,
            currentOffer: null
        };

        this.refreshOfferData = this.refreshOfferData.bind(this);
    }

    componentDidMount = () => {
        this.refreshOfferData(this.props.match.params.id);
    };

    refreshOfferData = houseId => {
        API.getHome(houseId).then(response => {
            this.setState(
                {
                    currentHouse: response.data.doc[0].imgs[0],
                    property: response.data.doc[0],
                    user: response.data.user
                },
                () => {
                    API.getOffer(this.state.property, this.state.user).then(
                        res => {
                            this.setState({
                                currentOffer: res.data[0]
                            });
                        }
                    );
                }
            );
        });
    };

    render() {
        return (
            <div>
                <TopNav />
                <div className="container buyer-dash w-80 mb-10 h-100">
                    <h1>Buyer Dashboard</h1>
                    <img src={this.state.currentHouse} alt="" />

                    <Financing
                        userEmail={this.props.email}
                        home={this.state.property}
                        user={this.state.user}
                        currentOffer={this.state.currentOffer}
                    />
                    <PurchaseAgreement
                        userEmail={this.props.email}
                        home={this.state.property}
                        user={this.state.user}
                        currentOffer={this.state.currentOffer}
                    />
                    <SubmitOffer
                        userEmail={this.props.email}
                        home={this.state.property}
                        user={this.state.user}
                    />
                    <Messages userEmail={this.props.email} />
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
