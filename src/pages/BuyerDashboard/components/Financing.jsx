import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import API from "../../../api/helpers";
import Dropzone from "react-dropzone";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom";
import PurchaseDoc from "../../../documents/residential_purchase.pdf";

import { debounce } from "throttle-debounce";

class Financing extends React.Component {
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
                    <h1 className="pr-4">1</h1>
                    <span className="section-title">
                        Financing
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
                    <h5 className="blue">How would you like to finance this purchase?</h5>
                    <h5 className="blue">Things Left To Do...</h5>
                    <input
                        type="checkbox"
                        disabled
                        checked={
                            this.state.currentOffer.purchaseAgreement.length
                        }
                        className="d-inline m-2 ml-0"
                    />
                    <p className="paragraph d-inline">
                        Upload your preapproval or final loan documentation
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
                                Upload Docs
                            </small>
                        </div>
                    </Dropzone>
                    <div>
                        <input type="checkbox" className="d-inline m-2 ml-0" />
                        <i className="lightGrey fa fa-pencil d-inline" />
                        <input
                            type="phone"
                            className="dyanmic-input-size d-inline borderless"
                            placeholder="Add your phone number"
                        />
                        <span className="purple">
                            {" "}
                            (this will only be shown to buyers after you approve
                            their offer)
                        </span>
                        <br />

                        <button
                            className="d-inline btn btn-default"
                        >
                            <span className="text-primary">
                                Add Phone Number
                            </span>
                        </button>
                    </div>
                    
                </Collapse>
            </div>
        );
    }
}
export default Financing;
