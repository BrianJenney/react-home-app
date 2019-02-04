import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import API from "../../../api/helpers";
import Dropzone from "react-dropzone";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom";
import FileUpload from "../../../components/FileUpload";

class SubmitOffer extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            offerSubmitted: false,
            collapse: false,
            form: new FormData(),
            value: "",
            home: null,
            user: null,
            supportingDocument: ""
        };
    }

    componentDidUpdate = props => {
        this.getOfferData(props);
    };

    getOfferData = props => {
        API.getOfferByUser(this.props.user, this.props.home).then(res => {
            if (res.data.length) {
                const offerSubmitted = res.data[0].readyToSend;
                this.setState({
                    supportingDocument: res.data[0].supportingDocument
                });
            }
        });
    };

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    sendMessage = () => {
        API.postMessage(this.state.value).then(() => {
            this.setState({ collapse: false });
        });
    };

    handleDrop = (documentType, files) => {
        files.forEach(file => {
            this.state.form.set("file", file);
            this.state.form.set("documentType", documentType);
            this.state.form.set("homeId", this.props.home._id);
            this.state.form.set("userId", this.props.user.id);

            API.makeOffer(this.state.form).then(res => {
                this.setState({
                    supportingDocument: res.data.supportingDocument || ""
                });
            });
        });
    };

    submitOffer = () => {
        API.submitOffer(this.props.home._id, this.props.user.id).then(() => {
            this.setState({ collapse: false });
        });
    };

    render() {
        return (
            <div className="card p-3">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1 className="pr-4">3</h1>
                    <span className="section-title">Submit Offer</span>
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
                    <input
                        type="checkbox"
                        disabled
                        className="d-inline m-2 ml-0"
                    />
                    <p className="paragraph d-inline">
                        Write an optional message to seller alongside your offer
                    </p>
                    <textarea
                        className="form-control border"
                        rows={4}
                        style={{
                            width: "90%",
                            marginLeft: "1.7em",
                            marginTop: "0.7em",
                            marginBottom: "0.7em",
                            backgroundColor: "#ffffff"
                        }}
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <input
                        type="checkbox"
                        disabled
                        className="d-inline m-2 ml-0"
                    />
                    <p className="paragraph d-inline">
                        Upload an optional attachments that may support your
                        offer
                    </p>
                    <FileUpload
                        title={"Upload Optional Supporting Documents"}
                        handleUpload={this.handleDrop}
                        documentType={"supportingDocuments"}
                    />

                    {this.state.supportingDocument.length > 0 && (
                        <div className="d-inline">
                            <i
                                className="fa fa-file-pdf-o d-inline mr-2"
                                aria-hidden="true"
                            />
                            <a href={this.state.supportingDocument}>
                                {this.state.supportingDocument}
                            </a>
                        </div>
                    )}
                    <div className="mt-5">
                        <button
                            className="btn btn-light"
                            onClick={this.submitOffer}
                        >
                            Submit Your Offer
                        </button>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default SubmitOffer;
