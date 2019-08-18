import React from "react";
import { connect } from "react-redux";
import SellerDashboard from "../SellerDashboard/Index";
import BuyerDashboard from "../BuyerDashboard/Index";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                {user.userType.toLowerCase() === "seller" ? (
                    <SellerDashboard user={user} />
                ) : (
                    <BuyerDashboard user={user} />
                )}
            </div>
        );
    }
}

export default Dashboard;
