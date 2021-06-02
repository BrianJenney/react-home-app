import React from 'react';
import EditIcon from '../../../img/icon-edit.png';
import DashboardItem from '../../../components/DashboardItem';
import API from '../../../api/helpers';
import HelloSign from 'hellosign-embedded';
import moment from 'moment';

const client = new HelloSign();

const Escrow = ({ userDocs, buyer, order }) => {
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
            type: 'bapr',
        },
    ];

    const relevantDocs = docsToFill.map(({ type }) => type);
    const getEarliestExpirationDate = (docs = []) => {
        const expirationTimes = docs
            .filter((contract) => {
                return contract.expirationTime;
            })
            .map(({ expirationTime }) => moment(Number(expirationTime)));

        return moment.min(expirationTimes).format('MMMM DD YYYY hh:mm a');
    };

    const getDaysLeft = (date) => {
        return moment(date).diff(moment(), 'days');
    };

    const getDocName = (name) => {
        const docObject = docsToFill.find(
            ({ type }) => type === name.toLocaleLowerCase()
        );
        return docObject?.title;
    };

    const emdReceipt = (buyer?.supportingDocuments || []).find(
        (doc) => doc.name === 'EMD'
    );
    const rpac = (buyer?.supportingDocuments || []).find(
        (doc) => doc.name === 'RPAC'
    );

    const timeSensitiveDocs = (userDocs || []).filter((doc) =>
        relevantDocs.includes(doc.name.toLocaleLowerCase())
    );

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

                {rpac && (
                    <div>
                        <p>
                            <a target="_blank" href={rpac.url}>
                                Residential Purchase Agreement Copy
                            </a>
                        </p>
                    </div>
                )}

                {emdReceipt && (
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
                                Congratulations, your buyer has offially
                                submitted their earnest money deposit into
                                escrow. Now both of you are officially in
                                escrow! Below is the earnest money deposit
                                receipt. Download and save it for your records.
                            </p>
                        </div>

                        <div>
                            <p>
                                <a target="_blank" href={emdReceipt.url}>
                                    EMD Receipt
                                </a>
                            </p>
                        </div>
                    </>
                )}
                {timeSensitiveDocs.length > 0 && (
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
                                Sign the following documents to close escrow and
                                official sell your home! Do so as soon as
                                possible as escrow must be closed based off the
                                timer above. Based off your contract, you have{' '}
                                {getDaysLeft(
                                    getEarliestExpirationDate(userDocs)
                                )}{' '}
                                days to complete all the escrow steps below
                                before the timer above ends or the deal will
                                expire.
                            </p>
                        </div>

                        <div
                            style={{
                                display: 'inline-flex',
                                marginTop: '1.25em',
                            }}
                        >
                            <p>
                                The documents below are due by{' '}
                                {timeSensitiveDocs &&
                                    getEarliestExpirationDate(
                                        timeSensitiveDocs
                                    )}{' '}
                            </p>
                        </div>
                    </>
                )}

                <div>
                    <p style={{ color: '#5665C0' }}></p>
                    {timeSensitiveDocs.map((doc, idx) => {
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
            </div>
        </DashboardItem>
    );
};

export default Escrow;
