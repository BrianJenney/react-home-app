import React from 'react';
import { withRouter } from 'react-router';
import API from '../../api/helpers';
import NavBar from '../../components/BreadcrumbNav';
import PurchaseAgreement from './components/PurchaseAgreement';
import SubmitOffer from './components/SubmitOffer';
import Financing from './components/Financing';
import Decisioning from './components/Decisioning';
import ContractCompletion from './components/ContractCompletion';
import { get } from 'lodash';

import gradientBackground from '../../img/bg-gradient.png';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			property: null,
			currentHouse: null,
			open: false,
			user: null,
			currentOffer: null,
			offers: []
		};

		this.refreshOfferData = this.refreshOfferData.bind(this);
	}

	componentDidMount = () => {
		this.getOffers();
		if (this.props.match.params.id) {
			this.refreshOfferData(this.props.match.params.id);
		}
	};

	getOffers = () => {
		API.getOffersFromBuyer(this.props.user._id).then((res) => {
			this.setState({ offers: res.data });
		});
	};

	refreshOfferData = (houseId) => {
		API.getHome(houseId).then((response) => {
			this.setState(
				{
					currentHouse: response.data.doc.imgs[0],
					property: response.data.doc
				},
				() => {
					API.getOfferForCurrentProperty(this.state.property, this.props.user).then((res) => {
						this.setState({
							currentOffer: res.data[0]
						});
					});
				}
			);
		});
	};

	render() {
		const { currentOffer, currentHouse, property, offers } = this.state;
		const { user } = this.props;

		const sellerPurchaseAgreement = get(currentOffer, 'sellerPurchaseAgreement', '');

		const maybeTruncate = (word) => {
			return word.length < 12 ? word : `${word.slice(0, 12)}...`;
		};

		return (
			<div style={{ backgroundImage: `url(${gradientBackground})`, height: '100vh', overflow: 'scroll' }}>
				<div className='container buyer-dash w-80 mb-10 h-100'>
					<h1>Buyer Dashboard</h1>
					<img src={currentHouse} alt='' />

					<div>
						{offers.map((offer, idx) => {
							return (
								<span
									key={idx}
									onClick={() => {
										this.props.history.replace(`/buyerdashboard/${offer.homeId}`);
									}}
								>
									{maybeTruncate(offer.home.address)} |
								</span>
							);
						})}
					</div>

					<Financing userEmail={user.email} home={property} user={user} currentOffer={currentOffer} />
					<PurchaseAgreement userEmail={user.email} home={property} user={user} currentOffer={currentOffer} />
					<SubmitOffer userEmail={user.email} home={property} user={user} currentOffer={currentOffer} />
					{offers.length > 0 &&
					property && (
						<Decisioning
							userEmail={user.email}
							home={property}
							user={user}
							offers={offers}
							currentOffer={currentOffer}
						/>
					)}
					{sellerPurchaseAgreement.length > 0 && <ContractCompletion offer={currentOffer} />}
					{/* <Messages userEmail={this.props.email} /> */}
				</div>
				<NavBar />
			</div>
		);
	}
}

export default withRouter(Dashboard);
