import React from "react";
import { Collapse } from "reactstrap";
import API from "../../../api/helpers";
import FileUpload from "../../../components/FileUpload";

class DisclosureAgreement extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.state = {
            collapse: false,
            transferDisclosure: "",
            leadPaintDisclosure: "",
            naturalHazardDisclosure: "",
            sellerQuestionaire: "",
            statewideAdvisory: "",
            supplementalQuestionaire: "",
            form: new FormData()
        };
    }

    componentDidMount = () => {
        API.getHome(this.props.userEmail).then(res => {
            if (res.data.doc) {
                this.setState({
                    ...res.data.doc
                });
            }
        });
    };

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    handleDrop = (documentType, files) => {
        files.forEach(file => {
            this.state.form.set("file", file);
            this.state.form.set("userEmail", this.props.userEmail);
            this.state.form.set("documentType", documentType);
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
                    <h1 className="pr-4">2</h1>
                    <span className="section-title">
                        Fill Out Disclosure Package
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

                    <FileUpload
                        title={"State Disclosure Agreement"}
                        handleUpload={this.handleDrop}
                        documentType={"transferDisclosure"}
                    />

                    {this.state.transferDisclosure.length > 0 && (
                        <div className="text-center">
                            <a href={this.state.transferDisclosure}>
                                {this.state.transferDisclosure}
                            </a>
                        </div>
                    )}

                    <FileUpload
                        title={"Lead Paint Disclosure"}
                        handleUpload={this.handleDrop}
                        documentType={"leadPaintDisclosure"}
                    />

                    {this.state.leadPaintDisclosure.length > 0 && (
                        <div className="text-center">
                            <a href={this.state.leadPaintDisclosure}>
                                {this.state.leadPaintDisclosure}
                            </a>
                        </div>
                    )}

                    <FileUpload
                        title={"Natural Hazard Disclosure"}
                        handleUpload={this.handleDrop}
                        documentType={"naturalHazardDisclosure"}
                    />

                    {this.state.naturalHazardDisclosure.length > 0 && (
                        <div className="text-center">
                            <a href={this.state.naturalHazardDisclosure}>
                                {this.state.naturalHazardDisclosure}
                            </a>
                        </div>
                    )}

                    <FileUpload
                        title={"Seller Questionaire"}
                        handleUpload={this.handleDrop}
                        documentType={"sellerQuestionaire"}
                    />

                    {this.state.sellerQuestionaire.length > 0 && (
                        <div className="text-center">
                            <a href={this.state.sellerQuestionaire}>
                                {this.state.sellerQuestionaire}
                            </a>
                        </div>
                    )}

                    <FileUpload
                        title={"Statewide Advisory"}
                        handleUpload={this.handleDrop}
                        documentType={"statewideAdvisory"}
                    />

                    {this.state.statewideAdvisory.length > 0 && (
                        <div className="text-center">
                            <a href={this.state.statewideAdvisory}>
                                {this.state.statewideAdvisory}
                            </a>
                        </div>
                    )}

                    <FileUpload
                        title={"Supplemental Questionaire"}
                        handleUpload={this.handleDrop}
                        documentType={"supplementalQuestionaire"}
                    />

                    {this.state.supplementalQuestionaire.length > 0 && (
                        <div>
                            <a href={this.state.supplementalQuestionaire}>
                                {this.state.supplementalQuestionaire}
                            </a>
                        </div>
                    )}
                </Collapse>
            </div>
        );
    }
}
export default DisclosureAgreement;
