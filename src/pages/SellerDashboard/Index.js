import React from 'react';
import '../../styles/dashboard.css';
import NavBar from '../../components/BreadcrumbNav';
import Messages from './components/Messages';
import DisclosureAgreement from './components/DisclosureAgreement';
import ListHome from './components/ListHome';
import Offers from './components/Offers';
import ContractCompletion from './components/ContractCompletion';
import withBackground from '../../components/WithBackground';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className='container dashboard w-80 h-100'>
					<h1>Dashboard</h1>
					<ListHome userEmail={this.props.user.email} />
					<DisclosureAgreement userEmail={this.props.user.email} />
					<Messages userEmail={this.props.user.email} />
					<Offers user={this.props.user} />
					<ContractCompletion user={this.props.user} />
				</div>
				<NavBar />
			</div>
		);
	}
}

export default withBackground(Dashboard);
