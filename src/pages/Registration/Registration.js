import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import API from '../../api/helpers.js';
import Dropzone from 'react-dropzone';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../../actions/login';
import * as logoutActions from '../../actions/logout';
import NavBar from '../../components/BreadcrumbNav';
import '../../styles/registration.css';

const keys = [ 'email', 'phoneNumber', 'password', 'firstName', 'lastName', 'userType' ];

class RegistrationPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			phoneNumber: '',
			userPic: '',
			userType: '',
			email: '',
			password: '',
			error: '',
			form: new FormData(),
			processing: false,
			picPreview: '',
			passwordMatch: true,
			errorMessage: ''
		};
	}

	resetForm = () => {
		for (const key of keys) {
			this.state.form.delete(key);
		}
	};

	registerUser = () => {
		this.setState({ errorMessage: '', processing: true });

		for (const key of keys) {
			this.state.form.append(key, this.state[key]);
		}

		API.register(this.state.form).then((response) => {
			if (response.data.errors) {
				this.setState({ errorMessage: response.data.message });
				return;
			}
			if (typeof response.data.errmsg !== `undefined`) {
				this.setState({
					error: response.data.errmsg.indexOf('duplicate')
						? 'That username is already taken'
						: response.data.errmsg,
					processing: false
				});
				return;
			}

			this.addUserToStore(response);
		});
	};

	addUserToStore = (response) => {
		if (response.data.token) {
			this.saveToken(response.data.token);
		}

		const user = {
			isLogged: true,
			name: this.state.email,
			id: response.data.userInfo._id,
			user: response.data.userInfo
		};

		this.props.loginaction.login(user);
		this.props.history.push('/listings');
	};

	saveToken = (token) => {
		const userToken = JSON.stringify(token);
		localStorage.setItem('casaToken', userToken);
	};

	confirmPassword = (e) => {
		const confirmedPass = e.target.value;
		const { password } = this.state;
		if (confirmedPass === password) {
			this.setState({ passwordMatch: true });
		} else {
			this.setState({ passwordMatch: false });
		}
	};

	handleDrop = (files) => {
		files.forEach((file) => {
			this.state.form.append('file', file);
			this.setState({ picPreview: file });
		});
	};

	onChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	changeUserType = (event, index, val, type) => {
		this.setState({ userType: val });
	};

	render() {
		return (
			<div>
				<div className='registration-wrapper'>
					<h1>Join Micasa</h1>

					<div className='registration-fields'>
						<TextField
							floatingLabelText='First Name'
							onChange={this.onChange.bind(this)}
							fullWidth={true}
							id='firstName'
							type='text'
						/>

						<TextField
							floatingLabelText='Last Name'
							onChange={this.onChange.bind(this)}
							fullWidth={true}
							id='lastName'
							type='text'
						/>
					</div>

					<div className='registration-fields'>
						<TextField
							floatingLabelText='Email'
							onChange={this.onChange.bind(this)}
							fullWidth={true}
							id='email'
							type='text'
						/>
						<TextField
							floatingLabelText='Phone Number'
							onChange={this.onChange.bind(this)}
							fullWidth={true}
							id='phoneNumber'
							maxLength='10'
							type='phone'
						/>
					</div>

					<div className='registration-fields'>
						<TextField
							floatingLabelText='Password'
							onChange={this.onChange.bind(this)}
							fullWidth={true}
							id='password'
							type='password'
						/>
						<TextField
							floatingLabelText='Confirm Password'
							onChange={this.confirmPassword.bind(this)}
							fullWidth={true}
							maxLength='12'
							type='password'
						/>
					</div>

					{!this.state.passwordMatch && <span className='registration-error'>Passwords do not match</span>}

					<div className='registration-fields'>
						<SelectField
							id='userType'
							value={this.state.userType}
							floatingLabelText='I am a ...'
							style={{ width: '100%' }}
							onChange={this.changeUserType.bind(this)}
						>
							<MenuItem value={'Buyer'} primaryText='Buyer' />
							<MenuItem value={'Seller'} primaryText='Seller' />
						</SelectField>

						<Dropzone className='registration-dropzone' onDrop={this.handleDrop} accept='image/*'>
							<p>Add Profile Photo</p>
						</Dropzone>
					</div>

					<div className='registration-pic-preview'>
						{this.state.picPreview.preview && (
							<img
								style={{ width: '100px', height: '100px' }}
								src={this.state.picPreview.preview}
								alt=''
							/>
						)}
					</div>

					<p className='text-muted'>{this.state.error}</p>

					{this.state.errorMessage.length > 0 && <span>{this.state.errorMessage}</span>}

					<RaisedButton
						primary={true}
						disabled={
							this.state.password.length < 1 ||
							this.state.email.length < 1 ||
							this.state.firstName.length < 1 ||
							this.state.lastName.length < 1 ||
							this.state.processing
						}
						onClick={this.registerUser}
						label={this.state.processing ? 'Processing...' : 'Sign Me Up'}
					/>
				</div>
				<NavBar />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		id: state.auth.id,
		email: state.auth.name
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loginaction: bindActionCreators(loginActions, dispatch),
		logoutaction: bindActionCreators(logoutActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
