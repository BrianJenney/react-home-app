import React from "react";
import { Collapse } from "reactstrap";
import API from "../../../api/helpers";
import { withRouter } from "react-router";
import FileUpload from "../../../components/FileUpload";
import "../../../styles/dashboard.css";
import { find, get } from "lodash";

class ContractCompletion extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            open: false,
            collapse: false,
            offer: {},
            currentHome: {},
            sellerPurchaseAgreement: "",
            offerUser: { email: "" },
            form: new FormData()
        };
    }

    componentDidMount() {
        API.getOffers(this.props.user).then(res => {
            const offer = find(res.data, { accepted: true });
            const sellerPurchaseAgreement = get(
                offer,
                "sellerPurchaseAgreement",
                ""
            );
            this.setState({
                offer,
                sellerPurchaseAgreement
            });
        });
    }

    openMessage = offer => {
        this.setState({
            open: true,
            currentHome: { _id: offer.homeId },
            offerUser: { email: offer.users[0].email }
        });
    };

    closeModal = () => {
        this.setState({ open: false });
    };

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    handleDrop = (documentType, files) => {
        const { offer } = this.state;
        files.forEach(file => {
            this.state.form.set("file", file);
            this.state.form.set("documentType", documentType);
            this.state.form.set("homeId", offer.homeId);
            this.state.form.set("userId", offer.users[0]._id);

            API.makeOffer(this.state.form).then(res => {
                this.setState({
                    sellerPurchaseAgreement:
                        res.data.sellerPurchaseAgreement || ""
                });
            });
        });
    };

    render() {
        const { offer } = this.state;
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
                    {this.state.offer ? (
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
                                        href={offer.purchaseAgreement}
                                    >
                                        Download
                                    </a>
                                    purchase agreement
                                </p>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    disabled
                                    className="d-inline m-2 ml-0"
                                />
                                <p className="paragraph d-inline">
                                    Scan and upload a zip file of the completed
                                    Purchase Agreement
                                </p>
                                <FileUpload
                                    title={"Upload Agreement"}
                                    handleUpload={this.handleDrop}
                                    documentType={"sellerPurchaseAgreement"}
                                />
                                {this.state.sellerPurchaseAgreement.length >
                                    0 && (
                                    <div className="text-center">
                                        <a
                                            href={
                                                this.state
                                                    .sellerPurchaseAgreement
                                            }
                                        >
                                            {this.state.sellerPurchaseAgreement}
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    disabled
                                    className="d-inline m-2 ml-0"
                                />
                                <p className="paragraph d-inline">
                                    Deliver keys to {userFirstName}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>No offers yet</div>
                    )}
                </Collapse>
            </div>
        );
    }
}
export default withRouter(ContractCompletion);
