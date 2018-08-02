import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import API from "../../../api/helpers";
import Dropzone from "react-dropzone";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { Link } from "react-router-dom";

class DisclosureAgreement extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            form: new FormData()
        };

        const styles = {
            display: "flex",
            alignItems: "center"
        };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    handleDrop = files => {
        files.forEach(file => {
            this.state.form.set("file", file);
            this.state.form.set("userEmail", this.props.userEmail);
            API.uploadDisclosure(this.state.form).then(() => {
                this.setState({ collapse: false });
            });
        });
    };

    render() {
        return (
            <div className="card p-3">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1 className="pr-4">3</h1>
                    <span className="section-title">
                        Download Disclosure Agreement
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
                    <input type="checkbox" className="d-inline m-2 ml-0" />
                    <p className="paragraph d-inline">
                        <a
                            className="mr-1"
                            href="https://res.cloudinary.com/dzriw5xmd/raw/upload/v1532886088/CA_Disclosure_Package_g72als.zip"
                        >
                            Download
                        </a>
                        and fill out California disclosure package
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
                                Upload Package
                            </small>
                        </div>
                    </Dropzone>
                </Collapse>
            </div>
        );
    }
}
export default DisclosureAgreement;