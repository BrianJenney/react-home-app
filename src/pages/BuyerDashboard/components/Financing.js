import React from 'react';
import { Collapse } from 'reactstrap';
import API from '../../../api/helpers';
import FileUpload from '../../../components/FileUpload';
import { debounce } from 'throttle-debounce';

class Financing extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			collapse: false,
			form: new FormData(),
			loanDocument: '',
			supportingDocument: ''
		};
	}

	componentWillReceiveProps = (nextProps) => {
		const { currentOffer } = nextProps;
		if (nextProps.currentOffer) {
			this.setState({
				loanDocument: currentOffer.loanDocument || '',
				supportingDocument: currentOffer.supportingDocument || ''
			});
		}
	};

	toggle() {
		this.setState({ collapse: !this.state.collapse });
	}

	handleDrop = (documentType, files) => {
		files.forEach((file) => {
			this.state.form.set('file', file);

			this.state.form.set('homeId', this.props.home._id);
			this.state.form.set('userId', this.props.user.user._id);
			this.state.form.set('documentType', documentType);

			API.makeOffer(this.state.form).then((res) => {
				this.setState({
					loanDocument: res.data.loanDocument || '',
					supportingDocument: res.data.supportingDocument || ''
				});
			});
		});
	};

	updatePurchasePrice = (e) => {
		this.setState({ currentOffer: e.target.value });

		let obj = {
			homeId: this.props.home._id,
			userId: this.props.user._id,
			offer: e.target.value
		};

		debounce(1000, API.makeOffer(obj));
	};

	render() {
		return (
			<div className='card p-3'>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<h1 className='pr-4'>1</h1>
					<span className='section-title'>Financing</span>
					<span
						className={this.state.collapse ? 'fa fa-2x fa-angle-up pl-4' : 'fa fa-2x fa-angle-down pl-4'}
						onClick={this.toggle}
					/>
				</div>
				<Collapse isOpen={this.state.collapse}>
					<h5 className='blue'>Things Left To Do...</h5>
					<a href='https://rocketmortgage.com'>
						<div className='rocket-mortgage'>
							<p>Apply Now on Rocket Mortgage</p>

							<span className='fa fa-2x fa-angle-right pl-4' />
						</div>
					</a>

					<input
						type='checkbox'
						disabled
						checked={this.state.loanDocument.length}
						className='d-inline m-2 ml-0'
					/>
					<p className='paragraph d-inline'>Upload your preapproval letter</p>

					<FileUpload
						title={'Upload Preapproval Documentation'}
						handleUpload={this.handleDrop}
						documentType={'loanDocument'}
					/>
					{this.state.loanDocument.length > 0 && (
						<div className='d-inline'>
							<i className='fa fa-file-pdf-o d-inline mr-2' aria-hidden='true' />
							<a href={this.state.loanDocument}>{this.state.loanDocument}</a>
						</div>
					)}
					<FileUpload
						title={'Upload Supporting Documentation'}
						handleUpload={this.handleDrop}
						documentType={'supportingDocument'}
					/>
					{this.state.supportingDocument.length > 0 && (
						<div className='d-inline'>
							<i className='fa fa-file-pdf-o d-inline mr-2' aria-hidden='true' />
							<a href={this.state.supportingDocument}>{this.state.supportingDocument}</a>
						</div>
					)}

					<input
						type='checkbox'
						disabled
						checked={this.state.loanDocument.length}
						className='d-inline m-2 ml-0'
					/>
					<p className='paragraph d-inline'>
						Upload proof of funds for your downpayment. This can be a bank statement, stocks or retirement
						account
					</p>
					<FileUpload
						title={'Upload Bank Statement as Proof of Funds'}
						handleUpload={this.handleDrop}
						documentType={'bankStatement'}
					/>
					<FileUpload
						title={'Upload Optional Supporting Documentation'}
						handleUpload={this.handleDrop}
						documentType={'supportingBankStatement'}
					/>
				</Collapse>
			</div>
		);
	}
}
export default Financing;
