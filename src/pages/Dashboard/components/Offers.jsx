import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import API from "../../../api/helpers";
import { Link } from "react-router-dom";
import "../../../styles/dashboard.css";

class Offers extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            offers: []
        };

        const styles = {
            display: "flex",
            alignItems: "center"
        };
    }

    componentDidMount() {
        API.getOffers(this.props.user).then(res => {
            this.setState({ offers: res.data });
        });
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

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
                    {this.state.offers.map((offer, idx) => {
                        return (
                            <div key={offer._id} className="offer-info">
                                {offer.users.length && (
                                    <img
                                        className="user-pic"
                                        src={offer.users[0].userPic}
                                        alt=""
                                    />
                                )}
                                \
                                <a href={offer.purchaseAgreement}>
                                    Purchase Agreement
                                </a>
                                <p>{offer.offer}</p>
                            </div>
                        );
                    })}
                </Collapse>
            </div>
        );
    }
}
export default Offers;
