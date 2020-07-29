import React from 'react';
import '../../styles/dashboard.css';
import NavBar from '../../components/BreadcrumbNav';
import Messages from './components/Messages';
import DisclosureAgreement from './components/DisclosureAgreement';
import ListHome from './components/ListHome';
import Offers from './components/Offers';
import ContractCompletion from './components/ContractCompletion';
import withBackground from '../../components/WithBackground';

const Dashboard = ({ user }) => (
	<div>
		<div className='container dashboard w-80 h-100'>
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

export default withBackground(Dashboard);
