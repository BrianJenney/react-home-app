import React, { useState, useEffect } from 'react';
import DashboardItem from '../../../components/DashboardItem';
import API from '../../../api/helpers';
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
            if (data?.data?.data?.embedded.sign_url) {
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
            } else {
                console.log('ERROR');
            }
        });
    };

    const docsToFill = [
        {
            title: 'BCO: Buyer Counter Offer',
            type: 'bco',
        },
        {
            title: 'SPQ: Seller Property Questionnaire',
            type: 'spq',
        },
        {
            title: 'SCO: Seller Counter Offer',
            type: 'sco',
        },
        {
            title: 'RPA: Residential Purchase Agreement',
            type: 'rpa',
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
                    {userDocs.map((doc, idx) => {
                        return (
                            <div
                                key={idx}
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
                                        <span className="material-icons">
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
            </div>
        </DashboardItem>
    );
};

export default ListingDocuments;
