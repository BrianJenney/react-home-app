import React from 'react';
import { connect } from 'react-redux';
import SellerDashboard from '../SellerDashboard/Index';
import BuyerDashboard from '../BuyerDashboard/Index';

const Dashboard = ({ user }) => (
	<div>
		{user.userType.toLowerCase() === 'seller' ? <SellerDashboard user={user} /> : <BuyerDashboard user={user} />}
	</div>
);

function mapStateToProps(state) {
	return {
		user: state.auth
	};
}

export default connect(mapStateToProps, {})(Dashboard);
