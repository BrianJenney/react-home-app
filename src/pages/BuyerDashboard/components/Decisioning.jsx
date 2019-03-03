import React from "react";

import { Collapse, Button, CardBody, Card } from "reactstrap";
import API from "../../../api/helpers";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import * as loginActions from "../../../actions/logout";
import * as logoutActions from "../../../actions/logout";
import * as actions from "../BuyerOffers.ducks";
import TopNav from "../../../components/TopNav";
import NavBar from "../../../components/BreadcrumbNav";
import ChatIcon from "../../../img/icon-chat.svg";
import DialogModal from "../../../components/modals/Message";
import moment from "moment";
import currencyFormatter from "../../../utils/currency-formatter";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            open: false,
            collapse: false,
            offers: [],
            home: {},
            offerUser: { email: "" }
        };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    componentDidUpdate = prevProps => {
        const { home, user } = this.props;
        const { offers } = this.state;
        if (prevProps.home !== home) {
            this.props.offerActions.getOffers(user.id, home._id);
        }
    };

    openMessage = offer => {
        this.setState({
            open: true,
            currentHome: { _id: offer.homeId },
            offerUser: { email: offer.users[0].email }
        });
    };

    closeModal = () => {
        this.setState({ open: false });
    };

    acceptOffer = offer => {
        //TODO: another API route to have the BUYER accept the offer
    };

    renderOffers = () => {
        const { offer } = this.props;
        const { home } = this.state;

        return (
            <div key={offer._id} className="row offer-info">
                <div className="col-1">
                    {offer.users && offer.users.length > 0 && (
                        <img
                            className="user-pic rounded-circle w-10 h-10"
                            src={offer.users[0].userPic}
                            alt=""
                        />
                    )}
                </div>
                <div className="col-3">
                    <span>
                        {offer.users && offer.users.length > 0 && (
                            <div className="user-info">
                                <b>{offer.users[0].email}</b>
                            </div>
                        )}
                    </span>
                </div>
                <div className="col-4 text-center">
                    <a href={offer.purchaseAgreement}>
                        <i className="lightGrey fa fa-2x fa-file d-inline" />
                    </a>
                </div>
                <div className="col-2">
                    <div
                        className="btn-toolbar"
                        role="toolbar"
                        aria-label="Toolbar with button groups"
                    >
                        <div
                            className="btn-group mr-2"
                            role="group"
                            aria-label="First group"
                        >
                            <img
                                src={ChatIcon}
                                onClick={this.openMessage.bind(null, offer)}
                                alt=""
                            />
                        </div>
                        <div
                            className="btn-group mr-2"
                            role="group"
                            aria-label="Second group"
                        />
                    </div>
                </div>
                <div className="col-2 text-right">
                    {offer.accepted && (
                        <button className="btn btn-success" disabled>
                            Offer Accepted
                        </button>
                    )}

                    {!offer.accepted && (
                        <button
                            onClick={this.acceptOffer.bind(null, offer)}
                            className="btn btn-light"
                        >
                            Accept
                        </button>
                    )}
                </div>
            </div>
        );
    };

    render() {
        const { offer } = this.props;
        return (
            <div className="card p-3">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1 className="pr-4">4</h1>
                    <span className="section-title">Decisioning</span>
                    <span
                        className={
                            this.state.collapse
                                ? "fa fa-2x fa-angle-up pl-4"
                                : "fa fa-2x fa-angle-down pl-4"
                        }
                        onClick={this.toggle}
                    />
                </div>
                <Collapse isOpen={this.state.collapse}>
                    {offer ? this.renderOffers() : ""}
                    <DialogModal
                        closeModal={this.closeModal.bind(this)}
                        open={this.state.open}
                        propertyInfo={this.state.home}
                        senderEmail={this.props.user.name}
                        user={this.state.offerUser}
                    />
                </Collapse>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        id: state.loggedIn.id,
        email: state.loggedIn.name,
        user: state.loggedIn.user,
        offer: state.buyerOffers.offer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginaction: bindActionCreators(loginActions, dispatch),
        logoutaction: bindActionCreators(logoutActions, dispatch),
        offerActions: bindActionCreators(actions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
