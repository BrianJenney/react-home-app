import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import API from "../../../api/helpers";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import FileUpload from "../../../components/FileUpload";
import "../../../styles/dashboard.css";
import moment from "moment";
import { find, isEmpty, get } from "lodash";

class ContractCompletion extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            open: false,
            collapse: false
        };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        const { offer } = this.props;
        const userFirstName = get(offer, "users[0].firstName", "");
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
                    <div>
                        <h5 className="blue">Things Left To Do...</h5>
                        <div>
                            <input
                                type="checkbox"
                                disabled
                                className="d-inline m-2 ml-0"
                            />
                            <p className="paragraph d-inline">
                                <a
                                    className="mr-1"
                                    href={offer.sellerPurchaseAgreement}
                                >
                                    Download
                                </a>
                                the seller-signed purchase agreement
                            </p>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                disabled
                                className="d-inline m-2 ml-0"
                            />
                            <p className="paragraph d-inline">
                                Send the Purchase Agreement to your bank and
                                they wiil complete the official purchase
                            </p>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                disabled
                                className="d-inline m-2 ml-0"
                            />
                            <p className="paragraph d-inline">
                                Receive home keys from the seller
                            </p>
                        </div>
                    </div>
                </Collapse>
            </div>
        );
    }
}
export default withRouter(ContractCompletion);
