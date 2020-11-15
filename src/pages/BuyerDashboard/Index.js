import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import API from '../../api/helpers';
import PurchaseAgreement from './components/PurchaseAgreement';
import SubmitOffer from './components/SubmitOffer';
import Financing from './components/Financing';
import Decisioning from './components/Decisioning';
import ContractCompletion from './components/ContractCompletion';
import WithBackground from '../../components/WithBackground';
import BuyerWizard from '../BuyerWizard/BuyerWizard';

const BuyerDashboard = ({ match }) => {
    const user = useSelector((state) => state.auth);
    const [allOffers, setOffers] = useState([]);
    const { buyerWizardCompleted } = user;

    useEffect(() => {
        API.getOffersFromBuyer(user._id).then((res) => {
            setOffers(res.data);
        });
    }, [user]);

    if (!buyerWizardCompleted) {
        return <BuyerWizard />;
    }

    const {
        params: { id },
    } = match;
    const currentOffer = id
        ? allOffers.filter(({ _id }) => {
              return _id === id;
          })
        : null;

    // TODO: offer should include property doc
    const currentProperty = currentOffer && currentOffer.property;

    return (
        <div>
            <div className="container dashboard w-80 h-100">
                <Financing
                    home={currentProperty}
                    user={user}
                    currentOffer={currentOffer}
                />
                <PurchaseAgreement
                    home={currentProperty}
                    user={user}
                    currentOffer={currentOffer}
                />
                <SubmitOffer
                    home={currentProperty}
                    user={user}
                    currentOffer={currentOffer}
                />
                {allOffers.length > 0 && currentProperty && (
                    <Decisioning
                        home={currentProperty}
                        user={user}
                        offers={allOffers}
                        currentOffer={currentOffer}
                    />
                )}
                {currentOffer && currentOffer.sellerPurchaseAgreement > 0 && (
                    <ContractCompletion offer={currentOffer} />
                )}
            </div>
        </div>
    );
};

export default withRouter(WithBackground(BuyerDashboard));
