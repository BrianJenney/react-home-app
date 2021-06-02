import React from 'react';
import { Collapse } from 'reactstrap';
import API from '../../../api/helpers';
import ChatIcon from '../../../img/icon-chat.svg';
import DialogModal from '../../../components/modals/Message';
import { find } from 'lodash';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            open: false,
            collapse: false,
            offerUser: { email: '' },
        };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    componentDidUpdate = (prevProps) => {
        const { home, user } = this.props;
        if (prevProps.home !== home) {
            this.props.offerActions.getOffers(user._id);
        }
    };

    openMessage = (offer) => {
        this.setState({
            open: true,
            currentHome: { _id: offer.homeId },
            offerUser: { email: offer.seller[0].email },
        });
    };

    closeModal = () => {
        this.setState({ open: false });
    };

    acceptOffer = (offer) => {
        //TODO: make sure this works as expected
        API.buyerAcceptOffer(offer).then((res) => {
            console.log(res);
        });
    };

    renderOffers = (offers, home) => {
        const offer = find(offers, { homeId: home._id });

        return (
            <div key={offer._id} className="row offer-info">
                <div className="col-1">
                    {offer.seller && offer.seller.length > 0 && (
                        <img
                            className="user-pic rounded-circle w-10 h-10"
                            src={offer.seller[0].userPic}
                            alt=""
                        />
                    )}
                </div>
                <div className="col-3">
                    <span>
                        {offer.users && offer.users.length > 0 && (
                            <div className="user-info">
                                <b>{offer.users[0].email}</b>
                            </div>
                        )}
                    </span>
                </div>
                <div className="col-4 text-center">
                    <a target="_blank" href={offer.purchaseAgreement}>
                        <i className="lightGrey fa fa-2x fa-file d-inline" />
                    </a>
                </div>
                <div className="col-2">
                    <div
                        className="btn-toolbar"
                        role="toolbar"
                        aria-label="Toolbar with button groups"
                    >
                        <div
                            className="btn-group mr-2"
                            role="group"
                            aria-label="First group"
                        >
                            <img
                                src={ChatIcon}
                                onClick={this.openMessage.bind(null, offer)}
                                alt=""
                            />
                        </div>
                        <div
                            className="btn-group mr-2"
                            role="group"
                            aria-label="Second group"
                        />
                    </div>
                </div>
                <div className="col-2 text-right">
                    {offer.accepted && (
                        <button className="btn btn-success" disabled>
                            Offer Accepted
                        </button>
                    )}

                    {!offer.accepted && offer.sellerPurchaseAgreement && (
                        <button
                            onClick={this.acceptOffer.bind(null, offer)}
                            className="btn btn-light btn-primary"
                        >
                            Accept
                        </button>
                    )}
                    {!offer.accepted && !offer.sellerPurchaseAgreement && (
                        <button
                            onClick={this.acceptOffer.bind(null, offer)}
                            className="btn btn-light"
                            disabled
                        >
                            Pending
                        </button>
                    )}
                </div>
            </div>
        );
    };

    render() {
        const { offers, home } = this.props;
        return (
            <div className="card p-3">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h1 className="pr-4">4</h1>
                    <span className="section-title">Decisioning</span>
                    <span
                        className={
                            this.state.collapse
                                ? 'fa fa-2x fa-angle-up pl-4'
                                : 'fa fa-2x fa-angle-down pl-4'
                        }
                        onClick={this.toggle}
                    />
                </div>
                <Collapse isOpen={this.state.collapse}>
                    {offers && home ? this.renderOffers(offers, home) : ''}
                    {home && (
                        <DialogModal
                            closeModal={this.closeModal.bind(this)}
                            open={this.state.open}
                            propertyInfo={home}
                            senderEmail={this.props.user.name}
                            user={this.state.offerUser}
                        />
                    )}
                </Collapse>
            </div>
        );
    }
}

export default Dashboard;
