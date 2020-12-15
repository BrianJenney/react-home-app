import React, { useState, useEffect } from 'react';
import DashboardItem from '../../../components/DashboardItem';
import API from '../../../api/helpers';
import FileUpload from '../../../components/FileUpload';
import DownloadIcon from '../../../img/icon-download.png';
import '../../../styles/listingDocuments.css';

const ListingDocuments = ({ userEmail }) => {
    const [formData, setFormData] = useState(new FormData());
    const [userDocs, setUserDocs] = useState({});

    useEffect(() => {
        API.getHome(userEmail).then((res) => {
            if (res.data.doc) {
                setUserDocs({ ...res.data.docs });
            }
        });
    });

    const handleDrop = (documentType, files) => {
        files.forEach((file) => {
            formData.set('file', file);
            formData.set('userEmail', this.props.userEmail);
            formData.set('documentType', documentType);
            setFormData(formData);
            API.uploadDisclosure(formData).then((res) => {
                this.setState({
                    ...res.data,
                });
            });
        });
    };

    const docsToFill = [
        {
            title: 'SBSA: Statewide Buyer and Seller Advisory',
            type: 'sbsa',
        },
    ];

    return (
        <DashboardItem order={3} title="Fill Out Listing Documents">
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
                        docusign, These documents will later be sent to a buyer
                        who has made an offer on your property, informing them
                        the condition of property, etc Be sure to be truthful
                        when filling out the Disclosure Package
                    </p>
                </div>
                {docsToFill.map(({ title, type }) => (
                    <div>
                        <FileUpload
                            title={title}
                            handleUpload={handleDrop}
                            documentType={type}
                        />
                    </div>
                ))}
                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <input
                        type="checkbox"
                        checked
                        onChange={() => {}}
                        className="d-inline m-2 ml-0"
                    />
                    <p>Accept our Brokerage/Escrow Relationship Disclosure</p>
                </div>

                <div>
                    <FileUpload
                        title={'Brokerage/Escrow Relationship Disclosure'}
                        handleUpload={handleDrop}
                        documentType={'brokerageEscrow'}
                    />
                </div>
                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <p>
                        Below is your termite report, this will be sent to the
                        buyer later on in the transaction.
                    </p>
                </div>

                <div>
                    <FileUpload
                        title={'Termite Inspection'}
                        handleUpload={handleDrop}
                        documentType={'termiteInspection'}
                    />
                </div>
            </div>
        </DashboardItem>
    );
};

export default ListingDocuments;
