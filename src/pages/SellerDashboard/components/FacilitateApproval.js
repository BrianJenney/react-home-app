import React from 'react';
import DashboardItem from '../../../components/DashboardItem';
import '../../../styles/listingDocuments.css';
import '../../../styles/offers.css';

const FacilitateApproval = ({ buyer, order }) => {
    const findDocument = (name) =>
        buyer.supportingDocuments.find((doc) => doc.name === name);

    const conditionalLoanApproval = findDocument('CLA');

    const loanContingencyRemoval = findDocument('LCR');

    return (
        <DashboardItem order={order} title="Facilitate Appraisal">
            <div className="listing-docs">
                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <input
                        type="checkbox"
                        checked
                        onChange={() => {}}
                        className="d-inline m-2 ml-0"
                    />
                    <p>
                        Since your buyer is taking a mortgage out to finance the
                        property their loan officer will be sending out an
                        appraiser to conduct an inspection of the property to
                        see if the value of the property at which it is being
                        sold at is accurate. The lender’s appraiser assigned by
                        the bank will contact you to facilitate an inspection.
                        Please coordinate with the appraiser.
                    </p>
                </div>
                <div>
                    <p>
                        Congratulations, your buyer has been approved by their
                        loan officer! Below is the buyer’s conditional loan
                        approval.
                    </p>
                </div>
                <div>
                    {conditionalLoanApproval && (
                        <p>
                            <a href={conditionalLoanApproval?.url}>
                                Conditional Loan Approval
                            </a>
                        </p>
                    )}
                </div>

                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <input
                        type="checkbox"
                        checked
                        onChange={() => {}}
                        className="d-inline m-2 ml-0"
                    />
                    <p>
                        Below is the buyer’s loan contingency removal. This
                        means that the buyer is commiting to a firm intent to
                        close escrow & purchase your property. If they fail to
                        do so, they will have to forfeit their Earnest Money
                        Deposit.
                    </p>
                </div>

                <div>
                    {loanContingencyRemoval && (
                        <p>
                            <a href={loanContingencyRemoval?.url}>
                                Loan Contingency Removal
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </DashboardItem>
    );
};

export default FacilitateApproval;
