import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import API from "../../../api/helpers";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "../../../styles/dashboard.css";
import ChatIcon from "../../../img/icon-chat.svg";
import DialogModal from "../../../components/modals/Message";
import moment from "moment";
import currencyFormatter from "../../../utils/currency-formatter";

class Offers extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            open: false,
            collapse: false,
            offers: [],
            currentHome: {},
            offerUser: { email: "" }
        };

        const styles = {
            display: "flex",
            alignItems: "center"
        };
    }

    componentDidMount() {
        API.getOffers(this.props.user).then(res => {
            let data = res.data.filter(offer => {
                return offer.offer > 0;
            });
            this.setState({ offers: data });
        });
    }

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

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    acceptOffer = offer => {
        API.acceptOffer(offer).then(() => {
            this.props.history.push(`/offeraccepted/${offer._id}`);
        });
    };

    goToAcceptancePage = offer => {
        this.props.history.push(`/offeraccepted/${offer._id}`);
    };

    render() {
        return (
            <div className="card p-3">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1 className="pr-4">4</h1>
                    <span className="section-title">Review Offers</span>
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
                    {this.state.offers.map(offer => {
                        return (
                            <div key={offer._id} className="row offer-info">
                                <div className="col-1">
                                    {offer.users.length > 0 && (
                                        <img
                                            className="user-pic rounded-circle w-10 h-10"
                                            src={offer.users[0].userPic}
                                            alt=""
                                        />
                                    )}
                                </div>
                                <div className="col-3">
                                    <span>
                                        {offer.users.length > 0 && (
                                            <div className="user-info">
                                                <b>{offer.users[0].email}</b>
                                            </div>
                                        )}
                                    </span>
                                </div>
                                <div className="col-3 text-center">
                                    <p className="text-muted x-small">
                                        Offered on{" "}
                                        {moment(offer.createdAt).format("l")}
                                    </p>
                                    <h4>{currencyFormatter(offer.offer)}</h4>
                                </div>
                                <div className="col-1 text-center">
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
                                                onClick={this.openMessage.bind(
                                                    null,
                                                    offer
                                                )}
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
                                        <button
                                            className="btn btn-success"
                                            onClick={this.goToAcceptancePage.bind(
                                                null,
                                                offer
                                            )}
                                        >
                                            Offer Accepted
                                        </button>
                                    )}

                                    {!offer.accepted && (
                                        <button
                                            onClick={this.acceptOffer.bind(
                                                null,
                                                offer
                                            )}
                                            className="btn btn-light"
                                        >
                                            Accept
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    <DialogModal
                        closeModal={this.closeModal.bind(this)}
                        open={this.state.open}
                        propertyInfo={this.state.currentHome}
                        senderEmail={this.props.user.name}
                        user={this.state.offerUser}
                    />
                </Collapse>
            </div>
        );
    }
}
export default withRouter(Offers);
