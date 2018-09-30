import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import API from "../../../api/helpers";
import Dropzone from "react-dropzone";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom";

const textA = {
    width: "90%",
    marginLeft: "1.7em",
    marginTop: "0.7em",
    marginBottom: "0.7em",
    backgroundColor: "#ffffff"
};

const padL = {
    paddingLeft: "1.4em"
};

class SubmitOffer extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            form: new FormData(),
            value: ""
        };

        const styles = {
            display: "flex",
            alignItems: "center"
        };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    // to handle message
    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    sendMessage = () => {
        API.postMessage(this.state.value).then(() => {
            // NEED HELP not sure
            this.setState({ collapse: false });
        });
    };

    handleDrop = files => {
        debugger;
        files.forEach(file => {
            this.state.form.set("file", file);

            this.state.form.set("homeId", this.props.home._id);
            this.state.form.set("userId", this.props.user._id);

            API.makeOffer(this.state.form).then(() => {
                this.setState({ collapse: false });
            });
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
                    <input type="checkbox" className="d-inline m-2 ml-0" />
                    <p className="paragraph d-inline">
                        Write an optional message to seller alongside your offer
                    </p>
                    <textarea
                        className="form-control border"
                        rows={4}
                        style={textA}
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <input type="checkbox" className="d-inline m-2 ml-0" />
                    <p className="paragraph d-inline">
                        Upload an optional attachments that may support your
                        offer
                    </p>
                    <div class="alignDZone" style={padL}>
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
                                    Upload Attachment
                                </small>
                            </div>
                        </Dropzone>
                    </div>

                    <input type="checkbox" className="d-inline m-2 ml-0" />
                    <p className="paragraph d-inline">
                        Officially submit your offer
                    </p>
                </Collapse>
            </div>
        );
    }
}
export default SubmitOffer;
