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

const InspectionReports = ({ buyer, order }) => {
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
            title: 'Repair Request',
            type: 'rr',
        },
        {
            title: 'Their Counter Request',
            type: 'rrco',
        },
    ];

    const getDocName = (name) => {
        const docObject = docsToFill.find(
            ({ type }) => type === name.toLocaleLowerCase()
        );
        return docObject?.title;
    };

    const physicalContingency = buyer.supportingDocuments.find(
        (doc) => doc.name === 'PICR'
    );
    return (
        <DashboardItem order={order} title="Facilitate Inspections">
            <div className="listing-docs">
                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <input
                        type="checkbox"
                        checked
                        onChange={() => {}}
                        className="d-inline m-2 ml-0"
                    />
                    <p>
                        Currently your buyer is reviewing your disclosure
                        package that you filled out in step 3 of the seller
                        dashboard. They will be reaching out to you eventually
                        to coordinate a day and time to conduct inspections with
                        their general inspector & specialized inspectors
                        thereafter. There may be multiple inspections depending
                        on the buyer.
                    </p>
                </div>

                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <input
                        type="checkbox"
                        checked
                        onChange={() => {}}
                        className="d-inline m-2 ml-0"
                    />
                    <p>
                        Be present for the inspections allowing property access
                        and answering any questions the inspectors may have.
                        Inspections must be conducted within a few days. Follow
                        the timer above for further reference.
                    </p>
                </div>

                <div>
                    <div
                        style={{
                            marginLeft: '1em',
                            padding: '1em',
                            position: 'relative',
                            display: 'flex',
                        }}
                    >
                        <div style={{ width: '15%' }}>
                            <p>{buyer?.name}</p>
                            {(buyer?.supportingDocuments || []).map(
                                (doc, i) => (
                                    <a key={i} href={doc.url}>
                                        <p>{getDocName(doc.name)}</p>
                                    </a>
                                )
                            )}
                        </div>

                        <div style={{ width: '100%' }}>
                            {(buyer?.counterOffers || [])
                                .filter((offer) =>
                                    ['RR', 'RRCO'].includes(offer.name)
                                )
                                .map((doc, i) => {
                                    return (
                                        <div
                                            key={i}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '2em',
                                            }}
                                        >
                                            <div className="offers-download">
                                                <img
                                                    height="35px"
                                                    width="35px"
                                                    alt="download-img"
                                                    src={DocDownload}
                                                />
                                                <div className="white-out" />
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
                                                    {getDocName(doc.name)}
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
                                                    position: 'relative',
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        position: 'absolute',
                                                        top: '-20px',
                                                        color: '#A2AAB6',
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
                                                    Need Help? Call Us at
                                                    555-555-1234
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
                </div>
                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <input
                        type="checkbox"
                        checked
                        onChange={() => {}}
                        className="d-inline m-2 ml-0"
                    />
                    <p>
                        Once {buyer.name} and you have agreed upon the
                        respective home repairs if any, {buyer.name} has signed
                        a Contingency removal. This means that {buyer.name} is
                        committing to a firm intent of closing escrow, waiving
                        their ability to reclaim their Earnest Money Deposit
                        (EMD) from the intiation of Escrow for reasons on home
                        repair.Below is a copy for your records of the signed
                        physical inspection contingency removal.
                    </p>
                </div>
                <div>
                    {physicalContingency && (
                        <p>
                            <a href={physicalContingency?.url}>
                                Physical Contingency
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </DashboardItem>
    );
};

export default InspectionReports;
