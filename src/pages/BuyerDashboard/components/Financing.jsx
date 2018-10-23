import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import API from "../../../api/helpers";
import Dropzone from "react-dropzone";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom";

import { debounce } from "throttle-debounce";

class Financing extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            form: new FormData(),
            loanDocument: ""
        };

        const styles = {
            display: "flex",
            alignItems: "center"
        };
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.currentOffer) {
            this.setState({
                loanDocument: nextProps.currentOffer.loanDocument || ""
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
            this.state.form.set("isPurchaseDoc", false);

            API.makeOffer(this.state.form).then(res => {
                this.setState({
                    loanDocument: res.data.loanDocument || ""
                });
            });
        });
    };

    updatePurchasePrice = e => {
        this.setState({ currentOffer: e.target.value });

        let obj = {
            homeId: this.props.home._id,
            userId: this.props.user._id,
            offer: e.target.value
        };

        debounce(1000, API.makeOffer(obj));
    };

    render() {
        return (
            <div className="card p-3">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1 className="pr-4">1</h1>
                    <span className="section-title">Financing</span>
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
                    <a href="https://rocketmortgage.com">
                        <div className="rocket-mortgage">
                            <p>Apply Now on Rocket Mortgage</p>

                            <span className="fa fa-2x fa-angle-right pl-4" />
                        </div>
                    </a>

                    <input
                        type="checkbox"
                        disabled
                        checked={this.state.loanDocument.length}
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
                            <small className="text-primary">Upload Doc</small>
                        </div>
                    </Dropzone>

                    {this.state.loanDocument.length > 0 && (
                        <div className="d-inline">
                            <i
                                className="fa fa-file-pdf-o d-inline mr-2"
                                aria-hidden="true"
                            />
                            <a href={this.state.loanDocument}>
                                {this.state.loanDocument}
                            </a>
                        </div>
                    )}
                </Collapse>
            </div>
        );
    }
}
export default Financing;
