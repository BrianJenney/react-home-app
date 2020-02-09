import React from "react";
import API from "../../api/helpers";
import "../../styles/dashboard.css";
import TopNav from "../../components/TopNav";
import NavBar from "../../components/BreadcrumbNav";

class OfferAccepted extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isBuyer: false,
            isSeller: false,
            home: null,
            offer: null
        };
    }

    componentDidMount = () => {
        API.getOffer(this.props.match.params.id).then(res => {
            if (res.data.home.userId === this.props.user._id) {
                this.setState({
                    isSeller: true,
                    isBuyer: false,
                    home: res.data.home,
                    offer: res.data.offer
                });
            } else {
                this.setState({
                    isSeller: false,
                    isBuyer: true,
                    home: res.data.home,
                    offer: res.data.offer
                });
            }
        });
    };

    render() {
        return (
            <div>
                <TopNav />
                <div className="container dashboard w-80 h-100">
                    <h1>Congratulations!</h1>
                    {this.state.isSeller && this.state.offer !== null && (
                        <div>
                            <p>Congratulations, your have accepted an offer.</p>

                            <p>
                                Contact your buyer informing them to contact
                                their mortgage lender. They will need to submit
                                the{" "}
                                <a href={this.state.offer.purchaseAgreement}>
                                    accepted purchase agreement
                                </a>{" "}
                                . Your lender will handle the rest of the
                                closing transaction. Do this as soon as
                                possible, you have approximately 30 days to
                                finalize the deal.
                            </p>

                            <p>
                                Contact Micasa if you have any questions. Again
                                Congratulations!
                            </p>
                        </div>
                    )}

                    {this.state.isBuyer && this.state.offer !== null && (
                        <div>
                            <p>
                                Congratulations, your offer has been accepted.
                            </p>

                            <p>
                                Contact your mortgage lender & submit your{" "}
                                <a href={this.state.offer.purchaseAgreement}>
                                    accepted purchase agreement
                                </a>{" "}
                                . Your lender will handle the rest of the
                                closing transaction. Do this as soon as
                                possible, you have approximately 30 days to
                                finalize the deal.
                            </p>

                            <p>
                                Contact Micasa if you have any questions. Again
                                Congratulations!
                            </p>
                        </div>
                    )}
                </div>
                <NavBar />
            </div>
        );
    }
}

export default OfferAccepted;
