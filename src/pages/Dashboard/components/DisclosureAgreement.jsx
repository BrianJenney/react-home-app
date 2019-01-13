import React from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import API from "../../../api/helpers";
import FileUpload from "../../../components/FileUpload";
import { Link } from "react-router-dom";

class DisclosureAgreement extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.state = {
            collapse: false,
            disclosureAgreement: "",
            form: new FormData()
        };

        const styles = {
            display: "flex",
            alignItems: "center"
        };
    }

    componentDidMount = () => {
        API.getHome(this.props.userEmail).then(res => {
            if (res.data.doc.length) {
                this.setState({
                    ...res.data.doc
                });
            }
        });
    };

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    handleDrop = (fileName, files) => {
        files.forEach(file => {
            this.state.form.set("file", file);
            this.state.form.set("userEmail", this.props.userEmail);
            this.state.form.set("fileName", fileName);
            API.uploadDisclosure(this.state.form).then(res => {
                this.setState({
                    ...res.data
                });
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
                    <input
                        type="checkbox"
                        disabled
                        className="d-inline m-2 ml-0"
                    />
                    <p className="paragraph d-inline">
                        <a
                            className="mr-1"
                            href="https://res.cloudinary.com/dzriw5xmd/raw/upload/v1532886088/CA_Disclosure_Package_g72als.zip"
                        >
                            Download
                        </a>
                        and fill out California disclosure package
                    </p>

                    {this.state.disclosureAgreement.length < 1 && (
                        <FileUpload
                            title={"State Disclosure Agreement"}
                            handleUpload={this.handleDrop}
                            fileName={"disclosureAgreement"}
                        />
                    )}
                    {this.state.disclosureAgreement.length > 0 && (
                        <div>
                            <a href={this.state.disclosureAgreement}>
                                {this.state.disclosureAgreement}
                            </a>
                        </div>
                    )}
                </Collapse>
            </div>
        );
    }
}
export default DisclosureAgreement;
