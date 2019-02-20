import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import API from "../../../api/helpers";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "../../../styles/dashboard.css";
import moment from "moment";
import { find } from "lodash";

class Offers extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            open: false,
            collapse: false,
            offer: [],
            currentHome: {},
            offerUser: { email: "" }
        };
    }

    componentDidMount() {
        API.getOffers(this.props.user).then(res => {
            const offer = find(res.data, { accepted: true });
            this.setState({ offer });
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
        const { offer } = this.state;
        return (
            <div className="card p-3">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1 className="pr-4">5</h1>
                    <span className="section-title">
                        Aid Contract Completion
                    </span>
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
                    {!offer && (
                        <span className="text-muted">No offers yet</span>
                    )}
                    <a href={offer.purchaseAgreement}>Purchase Agreement</a>
                </Collapse>
            </div>
        );
    }
}
export default withRouter(Offers);
