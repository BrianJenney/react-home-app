import React, { useState, useEffect } from 'react';
import DashboardItem from '../../../components/DashboardItem';
import API from '../../../api/helpers';
import HelloSign from 'hellosign-embedded';
import moment from 'moment';

const client = new HelloSign();

const Escrow = ({ user, order }) => {
    const [userDocs, setUserDocs] = useState([]);

    useEffect(() => {
        API.getUser(user._id).then((res) => {
            setUserDocs(res?.data?.data?.user.documents);
        });
    }, []);

    const openDocument = (signatureId) => {
        API.getEmbeddedSignUrl(signatureId).then((data) => {
            if (data?.data?.data?.embedded.sign_url) {
                client.open(`${data?.data?.data?.embedded.sign_url}`, {
                    clientId: process.env.REACT_APP_HELLO_SIGN_KEY,
                    skipDomainVerification: true,
                });
            }
        });
    };

    const docsToFill = [
        {
            title: 'Preliminary Title',
            type: 'pret',
        },
        {
            title: 'Escrow Holder Acceptance Acknowledgment',
            type: 'ehaa',
        },
        {
            title: 'Natural Hazard Disclosure',
            type: 'nhd',
        },
        {
            title: 'Escrow Instructions',
            type: 'esin',
        },
        {
            title: 'Buyers Approval of HOA & CC&Rs',
            type: 'bahcc',
        },
    ];

    const getEarliestExpirationDate = (docs) => {
        const expirationTimes = docs
            .filter((contract) => {
                return contract.expirationTime;
            })
            .map(({ expirationTime }) =>
                moment(expirationTime, 'x').format('MMM DD YYYY hh:mm a')
            );

        return moment.max(expirationTimes);
    };

    const getDocName = (name) => {
        const docObject = docsToFill.find(
            ({ type }) => type === name.toLocaleLowerCase()
        );
        return docObject?.title;
    };

    return (
        <DashboardItem order={order} title="Escrow">
            <div className="listing-docs">
                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <input
                        type="checkbox"
                        checked
                        onChange={() => {}}
                        className="d-inline m-2 ml-0"
                    />
                    <p>
                        Congratulations, both you and the buyer have accepted
                        the purchase agreement! Now your buyer has 3 days to
                        wire the earnest money deposit into the escrow company
                        that you chose. We will help faciliate the buyer to
                        complete this step. Just sit tight & wait for the next
                        steps
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
                        Below is the purchase agreement signed by both parties
                        for your records.
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
                        Congratulations, your buyer has offially submitted their
                        earnest money deposit into escrow. Now both of you are
                        officially in escrow! Below is the earnest money deposit
                        receipt. Download and save it for your records.
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
                        Sign the following documents to close escrow and
                        official sell your home! Do so as soon as possible as
                        escrow must be closed based off the timer above. Based
                        off your contract, you have [X] days to complete all the
                        escrow steps below before the timer above ends or the
                        deal will expire.
                    </p>
                </div>

                <div>
                    <p style={{ color: '#5665C0' }}>
                        The documents below are due by{' '}
                        {getEarliestExpirationDate(userDocs).toString()}
                    </p>
                    {userDocs.map((doc, idx) => {
                        return (
                            <div
                                key={idx}
                                className={`user-doc-container ${
                                    doc.completed ? 'completed' : 'incomplete'
                                }`}
                                style={{ display: 'flex' }}
                            >
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

export default Escrow;
