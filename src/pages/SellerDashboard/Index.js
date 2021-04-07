import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ListingDocuments from './components/ListingDocuments';
import Offers from './components/Offers';
import ShowYourHome from './components/ShowYourHome';
import ContractCompletion from './components/ContractCompletion';
import Escrow from './components/Escrow';
import Wizard from '../../pages/SellerWizard/Wizard';
import ProfileWizard from './components/ProfileWizard';
import withBackground from '../../components/WithBackground';
import API from '../../api/helpers';
import '../../styles/dashboard.css';

const Dashboard = () => {
    const [properties, setProperties] = useState([]);
    const user = useSelector((state) => state.auth);
    useEffect(() => {
        // retrieve all houses for the user
        API.getHomesByUser(user.email)
            .then((response) => {
                setProperties(response);
            })
            .catch((err) => new Error(err));
    }, []);

    const { sellerWizardCompleted } = user;

    if (!sellerWizardCompleted) {
        return <Wizard />;
    }
    return (
        <div>
            <div className="container dashboard w-80 h-100">
                <h1>Dashboard</h1>
                <ProfileWizard order={1} />
                {/* <ListHome order={2} userEmail={user.email} /> */}
                <ListingDocuments order={2} user={user} />
                {/*<ShowYourHome order={4} userEmail={user.email} /> */}
                {/*<Messages userEmail={user.email} />*/}
                <Offers order={3} user={user} />
                <Escrow order={4} user={user} />
                <ContractCompletion user={user} />
            </div>
        </div>
    );
};

export default withBackground(Dashboard);
