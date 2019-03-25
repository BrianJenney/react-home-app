import React from "react";
import { connect } from "react-redux";
import SellerDashboard from "../SellerDashboard/Index";
import BuyerDashboard from "../BuyerDashboard/Index";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { userType } = this.props;
        return (
            <div>
                {userType.toLowerCase() === "seller" ? (
                    <SellerDashboard />
                ) : (
                    <BuyerDashboard />
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userType: state.loggedIn.userType
    };
}

export default connect(mapStateToProps)(Dashboard);
