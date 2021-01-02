import React, { useState, useEffect } from 'react';
import DashboardItem from '../../../components/DashboardItem';
import API from '../../../api/helpers';
import FileUpload from '../../../components/FileUpload';
import EditIcon from '../../../img/icon-edit.png';
import '../../../styles/listingDocuments.css';
import HelloSign from 'hellosign-embedded';

const client = new HelloSign();

const ListingDocuments = ({ user, order }) => {
    const [userDocs, setUserDocs] = useState([]);

    useEffect(() => {
        API.getUser(user._id).then((res) => {
            setUserDocs(res?.data?.data?.user.documents);
        });
    }, []);

    const openDocument = (signatureId, docName) => {
        API.getEmbeddedSignUrl(signatureId).then((data) => {
            client.open(`${data?.data?.data?.embedded.sign_url}`, {
                clientId: process.env.REACT_APP_HELLO_SIGN_KEY,
                skipDomainVerification: true,
            });

            const docs = [...userDocs];
            docs.forEach((doc) => {
                if (doc.name === docName) {
                    doc.completed = true;
                }
            });

            setUserDocs(docs);
        });
    };

    const docsToFill = [
        {
            title: 'SBSA: Statewide Buyer and Seller Advisory',
            type: 'sbsa',
        },
        {
            title: 'SPQ: Seller Property Questionnaire',
            type: 'spq',
        },
        {
            title: 'WHSD: Water Heater Smoke Detector',
            type: 'whsd',
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
            title: 'EEBR: Earthquake/Environmental Booklet Receipt',
            type: 'eebr',
        },
        {
            title: 'EHD: Earthquake Hazards Disclosure',
            type: 'ehd',
        },
        {
            title: 'LPD: Lead-based Paint Disclosure',
            type: 'lpd',
        },
        {
            title: 'MCA: Market Condition Advisory',
            type: 'mca',
        },
        {
            title: 'LPD: Lead-based Paint Disclosure',
            type: 'lpd',
        },
        {
            title: 'AVID: Agent Visual Inspection Disclosure',
            type: 'avid',
        },
    ];

    const getDocName = (name) => {
        const docObject = docsToFill.find(
            ({ type }) => type === name.toLocaleLowerCase()
        );
        return docObject?.title;
    };

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
                {/*<div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                    }}
                >
                    {docsToFill.map(({ title, type }, idx) => (
                        <div key={`type${idx}`} className="upload-container">
                            <FileUpload
                                title={title}
                                handleUpload={handleDrop}
                                documentType={type}
                            />
                        </div>
                    ))}
                    </div>*/}

                <div>
                    {userDocs.map((doc) => {
                        return (
                            <div
                                className={`user-doc-container ${
                                    doc.completed ? 'completed' : 'incomplete'
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
                                        <span class="material-icons">
                                            check_circle_outline
                                        </span>
                                    )}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <input
                        type="checkbox"
                        checked
                        onChange={() => {}}
                        className="d-inline m-2 ml-0"
                    />
                    <p>Accept our Brokerage/Escrow Relationship Disclosure</p>
                </div>

                <div className="upload-container">
                    <FileUpload
                        downloadOnly
                        title={'Brokerage/Escrow Relationship Disclosure'}
                        handleUpload={() => {}}
                        documentType={'brokerageEscrow'}
                    />
                </div>
                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <p>
                        Below is your termite report, this will be sent to the
                        buyer later on in the transaction.
                    </p>
                </div>

                <div className="upload-container">
                    <FileUpload
                        downloadOnly
                        title={'Termite Inspection'}
                        documentType={'termiteInspection'}
                    />
                </div>
            </div>
        </DashboardItem>
    );
};

export default ListingDocuments;
