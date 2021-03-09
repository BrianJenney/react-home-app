import React, { useState, useEffect } from 'react';
import DashboardItem from '../../../components/DashboardItem';
import API from '../../../api/helpers';
import '../../../styles/listingDocuments.css';
import HelloSign from 'hellosign-embedded';
import DocDownload from '../../../img/icon-download.png';
import CounterOffer from '../../../img/icon-counteroffer.png';
import moment from 'moment';
import '../../../styles/offers.css';

const client = new HelloSign();

const Offers = ({ user, order }) => {
    const [buyers, setBuyers] = useState([]);

    useEffect(() => {
        API.getUser(user._id).then((res) => {
            setBuyers(res?.data?.data?.user.buyers);
        });
    }, []);

    const openDocument = (signatureId) => {
        API.getEmbeddedSignUrl(signatureId).then((data, err) => {
            if (data?.data?.data?.embedded.sign_url) {
                client.open(`${data?.data?.data?.embedded.sign_url}`, {
                    clientId: process.env.REACT_APP_HELLO_SIGN_KEY,
                    skipDomainVerification: true,
                });
            } else {
                console.log(err, 'ERROR');
            }
        });
    };

    const docsToFill = [
        {
            title: 'Purchase Agreement',
            type: 'rpa',
        },
        {
            title: 'Their Counter Offer',
            type: 'bco',
        },
    ];

    const getDocName = (name) => {
        const docObject = docsToFill.find(
            ({ type }) => type === name.toLocaleLowerCase()
        );
        return docObject?.title;
    };

    const buyersWithPurchaseAgreements = buyers.filter((buyer) => {
        return buyer.counterOffers.some((offer) => offer.name === 'RPA');
    });

    return (
        <DashboardItem order={order} title="Offers">
            <div className="listing-docs">
                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <input
                        type="checkbox"
                        checked
                        onChange={() => {}}
                        className="d-inline m-2 ml-0"
                    />
                    <p>
                        Congratulations, you’ve got an offer! Now you must
                        review the offer to see if it matches your needs! After
                        reading the offer you can accept,decline, or counter
                        offer the buyer if there's anything missing.
                    </p>
                </div>

                <div>
                    {buyersWithPurchaseAgreements.map((buyer, idx) => {
                        return (
                            <div
                                key={idx}
                                style={{
                                    marginLeft: '1em',
                                    padding: '1em',
                                    position: 'relative',
                                    display: 'flex',
                                }}
                            >
                                <div style={{ width: '15%' }}>
                                    <p>{buyer.name}</p>
                                </div>

                                <div style={{ width: '85%' }}>
                                    {buyer.counterOffers
                                        .filter((offer) =>
                                            ['BCO', 'RPA'].includes(offer.name)
                                        )
                                        .map((doc, i) => {
                                            return (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        marginBottom: '2em',
                                                    }}
                                                >
                                                    <div className="offers-download">
                                                        <img
                                                            alt="download-img"
                                                            src={DocDownload}
                                                        />
                                                        <div class="white-out" />
                                                        <p
                                                            className="offers-user-doc"
                                                            key={doc.name}
                                                            onClick={
                                                                doc.completed
                                                                    ? null
                                                                    : () =>
                                                                          openDocument(
                                                                              doc.signatureId
                                                                          )
                                                            }
                                                        >
                                                            {getDocName(
                                                                doc.name
                                                            )}
                                                            {doc.completed && (
                                                                <span className="material-icons">
                                                                    check_circle_outline
                                                                </span>
                                                            )}
                                                        </p>
                                                    </div>

                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            position:
                                                                'relative',
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                top: '-20px',
                                                                color:
                                                                    '#A2AAB6',
                                                            }}
                                                        >
                                                            Expires In:{' '}
                                                        </span>
                                                        <p>
                                                            {moment(
                                                                doc.expirationTime,
                                                                'x'
                                                            ).format(
                                                                'DD MMM YYYY hh:mm a'
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginLeft: '2em',
                                                        }}
                                                    >
                                                        <p className="call-us">
                                                            Need Help? Call Us
                                                            at 555-555-1234
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <img
                                                            onClick={() =>
                                                                openDocument(
                                                                    doc.counterOfferId
                                                                )
                                                            }
                                                            src={CounterOffer}
                                                            alt="counter offer"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </DashboardItem>
    );
};

export default Offers;
