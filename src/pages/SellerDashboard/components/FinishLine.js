import React, { useState, useEffect } from 'react';
import DashboardItem from '../../../components/DashboardItem';
import API from '../../../api/helpers';
import EditIcon from '../../../img/icon-edit.png';
import '../../../styles/listingDocuments.css';
import HelloSign from 'hellosign-embedded';

const client = new HelloSign();

const FinishLine = ({ user, order, userDocs, buyer }) => {
    const openDocument = (signatureId, docName) => {
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

    const sessDoc = userDocs.find((doc) => doc.name === 'SESS');
    const essDoc = buyer.supportingDocuments.find((doc) => doc.name === 'ESS');
    const vpcDoc = userDocs.find((doc) => doc.name === 'VPC');

    return (
        <DashboardItem order={order} title="Cross the Finish Line">
            <div className="listing-docs">
                <div>
                    {sessDoc && (
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
                                    Review & Sign the estimate settlement
                                    statement. The ESS summarizes the fees and
                                    changes the seller faces during the
                                    settelement phase of a housing transaction.
                                </p>
                            </div>
                            <div
                                className={`user-doc-container ${
                                    sessDoc.completed
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
                                    onClick={
                                        sessDoc.completed
                                            ? null
                                            : () =>
                                                  openDocument(
                                                      sessDoc.signatureId,
                                                      sessDoc.name
                                                  )
                                    }
                                >
                                    Seller's Estimate
                                    {sessDoc.completed && (
                                        <span className="material-icons">
                                            check_circle_outline
                                        </span>
                                    )}
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {essDoc && (
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
                                Below is the buyer’s Estimate Settlement
                                Statement Escrow wire receipt confirming that
                                they sent to fulifill last remaining balance
                                needed to purchase your home.
                            </p>
                        </div>
                        <p>
                            <a target="_blank" href={essDoc?.url}>
                                Buyer's ESS Wire Receipt
                            </a>
                        </p>
                    </>
                )}

                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <input
                        type="checkbox"
                        checked
                        onChange={() => {}}
                        className="d-inline m-2 ml-0"
                    />
                    <p>
                        Your buyer, {buyer.name}, will contact you to coordinate
                        a final property walk through. During the walk through
                        they will check if everything is normal, no holes in the
                        walls, unexpected damage, that was not found in previous
                        inspections.
                    </p>
                </div>

                <div>
                    {vpcDoc && (
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
                                    The buyer was satisfied with their final
                                    property walk through & is ready to close.
                                    Below is their verification of property
                                    condition
                                </p>
                            </div>
                            <div
                                className={`user-doc-container ${
                                    vpcDoc.completed
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
                                    onClick={
                                        vpcDoc.completed
                                            ? null
                                            : () =>
                                                  openDocument(
                                                      vpcDoc.signatureId,
                                                      vpcDoc.name
                                                  )
                                    }
                                >
                                    Verification of Property Condition
                                    {vpcDoc.completed && (
                                        <span className="material-icons">
                                            check_circle_outline
                                        </span>
                                    )}
                                </p>
                            </div>
                        </>
                    )}
                </div>
                {vpcDoc?.completed && (
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
                                Congratualtions on your official home sale!
                                Coordinate with the buyer to give your keys,
                                garage door opener, and anything else that is
                                revelant!
                            </p>
                        </div>
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
                                Please call us at 415-939-6521 with any
                                questions or if you are having trouble
                                completing the transaction
                            </p>
                        </div>
                    </>
                )}
            </div>
        </DashboardItem>
    );
};

export default FinishLine;
