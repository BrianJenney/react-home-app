import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import API from "../../../api/helpers";
import Dropzone from "react-dropzone";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom";
import PurchaseDoc from "../../../documents/residential_purchase.pdf";

import { debounce } from "throttle-debounce";

class PurchaseAgreement extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            form: new FormData(),
            currentOffer: {
                offer: null,
                purchaseAgreement: ""
            }
        };

        const styles = {
            display: "flex",
            alignItems: "center"
        };
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.currentOffer) {
            this.setState({
                currentOffer: {
                    offer: nextProps.currentOffer.offer || null,
                    purchaseAgreement:
                        nextProps.currentOffer.purchaseAgreement || ""
                }
            });
        }
    };

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    handleDrop = files => {
        files.forEach(file => {
            this.state.form.set("file", file);

            this.state.form.set("homeId", this.props.home._id);
            this.state.form.set("userId", this.props.user._id);

            API.makeOffer(this.state.form).then(() => {
                this.props.refreshOfferData(this.props.home._id);
            });
        });
    };

    updatePurchasePrice = e => {
        let obj = {
            homeId: this.props.home._id,
            userId: this.props.user._id,
            offer: e.target.value
        };

        debounce(
            1000,
            API.makeOffer(obj).then(data => {
                this.props.refreshOfferData(this.props.home._id);
            })
        );
    };

    render() {
        return (
            <div className="card p-3">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1 className="pr-4">3</h1>
                    <span className="section-title">
                        Fill Out Purchase Agreement
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
                    <h5 className="blue">Things Left To Do...</h5>

                    <div>
                        <input
                            type="checkbox"
                            disabled
                            checked={this.state.currentOffer.offer}
                            className="d-inline m-2 ml-0"
                        />
                        <p className="paragraph d-inline">
                            Enter your offer amount
                        </p>
                        <br />
                        {this.props.home && (
                            <div className="ml-5">
                                <div className="d-inline-block">
                                    <small className="text-center text-primary">
                                        Your Offer
                                    </small>
                                    <br />
                                    <i className="lightGrey fa fa-pencil d-inline" />
                                    <input
                                        type="number"
                                        className="dyanmic-input-size d-inline borderless"
                                        placeholder={this.props.home.price}
                                        value={this.state.currentOffer.offer}
                                        onChange={this.updatePurchasePrice.bind(
                                            this
                                        )}
                                    />
                                </div>

                                <div
                                    className="d-inline-block"
                                    style={{
                                        borderLeft: "1px solid grey",
                                        height: 30
                                    }}
                                />
                                <div className="d-inline-block ml-5">
                                    <small className="text-center text-primary">
                                        Asking Price
                                    </small>
                                    <br />
                                    <div className="muted paragraph d-inline">
                                        <h5>${this.props.home.price}</h5>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <input
                        type="checkbox"
                        disabled
                        checked={
                            this.state.currentOffer.purchaseAgreement.length
                        }
                        className="d-inline m-2 ml-0"
                    />
                    <p className="paragraph d-inline">
                        <a className="mr-1" href={PurchaseDoc} download>
                            Download
                        </a>
                        and fill out Purchase Agreement
                    </p>

                    <Dropzone
                        className="dropzone w-25 h-25 m-2"
                        onDrop={this.handleDrop}
                    >
                        <div className="upload-actions text-center">
                            <FloatingActionButton mini className="mt-3">
                                <ContentAdd />
                            </FloatingActionButton>
                            <br />
                            <small className="text-primary">
                                Upload Agreement
                            </small>
                        </div>
                    </Dropzone>

                    {this.state.currentOffer.purchaseAgreement.length && (
                        <div className="d-inline">
                            <i
                                class="fa fa-file-pdf-o d-inline mr-2"
                                aria-hidden="true"
                            />
                            <a href={this.state.currentOffer.purchaseAgreement}>
                                {this.state.currentOffer.purchaseAgreement}
                            </a>
                        </div>
                    )}
                </Collapse>
            </div>
        );
    }
}
export default PurchaseAgreement;
