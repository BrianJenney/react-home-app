import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ListingDocuments from './components/ListingDocuments';
import Offers from './components/Offers';
import ShowYourHome from './components/ShowYourHome';
import Escrow from './components/Escrow';
import InspectionReports from './components/InspectionReports';
import Wizard from '../../pages/SellerWizard/Wizard';
import FacilitateApproval from './components/FacilitateApproval';
import ProfileWizard from './components/ProfileWizard';
import FinishLine from './components/FinishLine';
import withBackground from '../../components/WithBackground';
import API from '../../api/helpers';
import '../../styles/dashboard.css';

const Dashboard = () => {
    const user = useSelector((state) => state.auth);
    const [userDocs, setUserDocs] = useState([]);
    const [buyer, setBuyer] = useState({});

    useEffect(() => {
        API.getUser(user._id).then((res) => {
            const user = res?.data?.data?.user;
            setUserDocs(user?.documents);
            const purchaser = (user?.buyers || []).find(
                (buyer) => buyer?._id === user?.purchaser
            );

            setBuyer(purchaser);
        });
    }, []);

    const { sellerWizardCompleted } = user;

    if (!sellerWizardCompleted) {
        return <Wizard />;
    }

    const ws = new WebSocket(`${process.env.REACT_APP_SOCKET_URL}/${user._id}`);

    ws.onmessage = function (e) {
        try {
            console.log(JSON.parse(e.data));
            console.log("Received: '" + e.data + "'");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <div className="container dashboard w-80 h-100">
                <h1>Dashboard</h1>
                <ProfileWizard order={1} />
                <ListingDocuments order={2} user={user} userDocs={userDocs} />
                <Offers order={3} user={user} userDocs={userDocs} />
                {buyer?.name && (
                    <>
                        <Escrow
                            order={4}
                            user={user}
                            userDocs={userDocs}
                            buyer={buyer}
                        />
                        <InspectionReports
                            order={5}
                            user={user}
                            userDocs={userDocs}
                            buyer={buyer}
                        />
                        <FacilitateApproval
                            order={6}
                            user={user}
                            userDocs={userDocs}
                            buyer={buyer}
                        />
                        <FinishLine
                            order={7}
                            user={user}
                            userDocs={userDocs}
                            buyer={buyer}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default withBackground(Dashboard);
