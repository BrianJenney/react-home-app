import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/BreadcrumbNav';
import Messages from './components/Messages';
import DisclosureAgreement from './components/DisclosureAgreement';
import ListHome from './components/ListHome';
import Offers from './components/Offers';
import ContractCompletion from './components/ContractCompletion';
import Wizard from '../../pages/SellerWizard/Wizard';
import withBackground from '../../components/WithBackground';
import '../../styles/dashboard.css';

const Dashboard = () => {
    const user = useSelector((state) => state.auth);
    const { sellerWizardCompleted } = user;

    useEffect(() => {}, [user]);

    if (!sellerWizardCompleted) {
        return <Wizard />;
    }
    return (
        <div>
            <div className="container dashboard w-80 h-100">
                <h1>Dashboard</h1>
                <ListHome userEmail={user.email} />
                <DisclosureAgreement userEmail={user.email} />
                <Messages userEmail={user.email} />
                <Offers user={user} />
                <ContractCompletion user={user} />
            </div>
            <NavBar />
        </div>
    );
};

export default withBackground(Dashboard);
