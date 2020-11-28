import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Messages from './components/Messages';
import ListingDocuments from './components/ListingDocuments';
import ListHome from './components/ListHome';
import Offers from './components/Offers';
import ContractCompletion from './components/ContractCompletion';
import Wizard from '../../pages/SellerWizard/Wizard';
import ProfileWizard from './components/ProfileWizard';
import withBackground from '../../components/WithBackground';
import '../../styles/dashboard.css';

const Dashboard = () => {
    const user = useSelector((state) => state.auth);
    const { sellerWizardCompleted } = user;

    if (!sellerWizardCompleted) {
        return <Wizard />;
    }
    return (
        <div>
            <div className="container dashboard w-80 h-100">
                <h1>Dashboard</h1>
                <ProfileWizard order={1} />
                <ListHome order={2} userEmail={user.email} />
                <ListingDocuments order={3} userEmail={user.email} />
                <Messages userEmail={user.email} />
                <Offers user={user} />
                <ContractCompletion user={user} />
            </div>
        </div>
    );
};

export default withBackground(Dashboard);
