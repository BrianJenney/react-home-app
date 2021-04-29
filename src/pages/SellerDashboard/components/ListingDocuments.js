import React, { useState, useEffect } from 'react';
import DashboardItem from '../../../components/DashboardItem';
import API from '../../../api/helpers';
import EditIcon from '../../../img/icon-edit.png';
import '../../../styles/listingDocuments.css';
import HelloSign from 'hellosign-embedded';

const client = new HelloSign();

const ListingDocuments = ({ order, userDocs }) => {
    const openDocument = (signatureId) => {
        API.getEmbeddedSignUrl(signatureId).then((data) => {
            if (data?.data?.data?.embedded.sign_url) {
                client.open(`${data?.data?.data?.embedded.sign_url}`, {
                    clientId: process.env.REACT_APP_HELLO_SIGN_KEY,
                    skipDomainVerification: true,
                });
            } else {
                console.log('ERROR');
            }
        });
    };

    const docsToFill = [
        {
            title: 'SPQ: Seller Property Questionnaire',
            type: 'spq',
        },
        {
            title: 'SBSA: Statewide Buyer Seller Advisory',
            type: 'sbsa',
        },
        {
            title: 'TDS: Transfer Disclosure Statement',
            type: 'tds',
        },
        {
            title: 'WCCM: Water Conserving Carbon Monoxide',
            type: 'wccm',
        },
        {
            title: 'WHSD: Water Heater and Smoke Detector',
            type: 'whsd',
        },
        {
            title: 'EHD: Earthquake Hazard Disclosure',
            type: 'ehd',
        },
        {
            title: 'EEBR: Earthquare/Environmental Booklet Receipt',
            type: 'eebr',
        },
        {
            title: 'LPD: Lead Based Paint Disclosure',
            type: 'lpd',
        },
        {
            title: 'MCA: Market Condition Advisory',
            type: 'mca',
        },
        {
            title: 'AVID: Agent Visual Inspection Disclosure',
            type: 'avid',
        },
    ];

    const docTypes = docsToFill.map(({ type }) => type);

    const getDocName = (name) => {
        const docObject = docsToFill.find(
            ({ type }) => type === name.toLocaleLowerCase()
        );
        return docObject?.title;
    };

    const berdDoc = userDocs.find((doc) => doc.name === 'BERD');

    return (
        <DashboardItem order={order} title="Fill Out Listing Documents">
            <div className="listing-docs">
                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <input
                        type="checkbox"
                        checked
                        onChange={() => {}}
                        className="d-inline m-2 ml-0"
                    />
                    <p>
                        Based off of seller preliminary questionnaire, you must
                        fill out the appropriate disclosure documents through
                        hellosign, These documents will later be sent to a buyer
                        who has made an offer on your property, informing them
                        the condition of property, etc Be sure to be truthful
                        when filling out the Disclosure Package
                    </p>
                </div>

                <div>
                    {userDocs
                        .filter((userDoc) =>
                            docTypes.includes(userDoc.name.toLocaleLowerCase())
                        )
                        .map((doc, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className={`user-doc-container ${
                                        doc.completed
                                            ? 'completed'
                                            : 'incomplete'
                                    }`}
                                    style={{ display: 'flex' }}
                                >
                                    <img
                                        className="doc-sign-icon"
                                        alt="edit icon"
                                        src={EditIcon}
                                    />
                                    <p
                                        className="user-doc"
                                        key={doc.name}
                                        onClick={
                                            doc.completed
                                                ? null
                                                : () =>
                                                      openDocument(
                                                          doc.signatureId,
                                                          doc.name
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
                            );
                        })}
                </div>

                {berdDoc && (
                    <>
                        <div
                            style={{
                                display: 'inline-flex',
                                marginTop: '1.25em',
                            }}
                        >
                            <input
                                type="checkbox"
                                checked
                                onChange={() => {}}
                                className="d-inline m-2 ml-0"
                            />
                            <p>
                                Accept our Brokerage/Escrow Relationship
                                Disclosure
                            </p>
                        </div>

                        <div
                            className={`user-doc-container ${
                                berdDoc.completed ? 'completed' : 'incomplete'
                            }`}
                            style={{ display: 'flex' }}
                        >
                            <img
                                className="doc-sign-icon"
                                alt="edit icon"
                                src={EditIcon}
                            />
                            <p
                                className="user-doc"
                                onClick={
                                    berdDoc.completed
                                        ? null
                                        : () =>
                                              openDocument(
                                                  berdDoc.signatureId,
                                                  berdDoc.name
                                              )
                                }
                            >
                                Brokerage/Escrow Relationship Disclosure
                                {berdDoc.completed && (
                                    <span className="material-icons">
                                        check_circle_outline
                                    </span>
                                )}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </DashboardItem>
    );
};

export default ListingDocuments;
