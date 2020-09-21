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

const formProps = [
    'email',
    'phoneNumber',
    'password',
    'firstName',
    'lastName',
    'userType',
];

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            userPic: '',
            userType: 'buyer',
            email: '',
            password: '',
            form: new FormData(),
            processing: false,
            picPreview: '',
            passwordMatch: true,
            errorMessage: null,
        };
    }

    resetForm = () => {
        for (const key of formProps) {
            this.state.form.delete(key);
        }
    };

    registerUser = () => {
        this.setState({ errorMessage: null, processing: true });

        for (const key of formProps) {
            this.state.form.set(key, this.state[key]);
        }

        const _this = this;
        API.register(this.state.form).then((response) => {
            if (response.data.errors) {
                _this.setState({ errorMessage: response.data.message });
                return;
            }
            if (typeof response.data.errmsg !== `undefined`) {
                _this.setState({
                    errorMessage: response.data.errmsg.indexOf('duplicate')
                        ? 'That username is already taken'
                        : response.data.errmsg,
                    processing: false,
                });
                return;
            }

            _this.addUserToStore(response);

            const user = {
                isLogged: true,
                ...response.data.userInfo,
            };

            const redirectRoute =
                _this.state.userType.toLocaleLowerCase() === 'seller'
                    ? '/dashboard'
                    : '/listings';

            _this.props.loginaction.login(user);
            _this.props.history.push(redirectRoute);
        });
    };

    addUserToStore = (response) => {
        if (response.data.token) {
            this.saveToken(response.data.token);
        }
    };

    saveToken = (token) => {
        const userToken = JSON.stringify(token);
        localStorage.setItem('casaToken', userToken);
    };

    confirmPassword = (e) => {
        const confirmedPass = e.target.value;
        const { password } = this.state;
        this.setState({ passwordMatch: confirmedPass === password });
    };

    handleDrop = (files) => {
        files.forEach((file) => {
            this.state.form.append('file', file);
            this.setState({ picPreview: file });
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value, errorMessage: null });
    };

    changeUserType = (event, index, val, type) => {
        this.setState({ userType: val });
    };

    render() {
        return (
            <div>
                <div className="registration-wrapper">
                    <h1>Join Micasa</h1>

                    <div className="registration-fields">
                        <TextField
                            floatingLabelText="First Name"
                            onChange={this.onChange.bind(this)}
                            fullWidth={true}
                            id="firstName"
                            type="text"
                        />

                        <TextField
                            floatingLabelText="Last Name"
                            onChange={this.onChange.bind(this)}
                            fullWidth={true}
                            id="lastName"
                            type="text"
                        />
                    </div>

                    <div className="registration-fields">
                        <TextField
                            floatingLabelText="Email"
                            onChange={this.onChange.bind(this)}
                            fullWidth={true}
                            id="email"
                            type="text"
                        />
                        <TextField
                            floatingLabelText="Phone Number"
                            onChange={this.onChange.bind(this)}
                            fullWidth={true}
                            id="phoneNumber"
                            maxLength="10"
                            type="phone"
                        />
                    </div>

                    <div className="registration-fields">
                        <TextField
                            floatingLabelText="Password"
                            onChange={this.onChange.bind(this)}
                            fullWidth={true}
                            id="password"
                            type="password"
                        />
                        <TextField
                            floatingLabelText="Confirm Password"
                            onChange={this.confirmPassword.bind(this)}
                            fullWidth={true}
                            maxLength="12"
                            type="password"
                        />
                    </div>

                    {!this.state.passwordMatch && (
                        <span className="registration-error">
                            Passwords do not match
                        </span>
                    )}

                    <div className="registration-fields">
                        <SelectField
                            id="userType"
                            value={this.state.userType}
                            floatingLabelText="I am a ..."
                            style={{ width: '100%' }}
                            onChange={this.changeUserType.bind(this)}
                        >
                            <MenuItem value={'Buyer'} primaryText="Buyer" />
                            <MenuItem value={'Seller'} primaryText="Seller" />
                        </SelectField>

                        <Dropzone
                            className="registration-dropzone"
                            onDrop={this.handleDrop}
                            accept="image/*"
                        >
                            <p>Add Profile Photo</p>
                        </Dropzone>
                    </div>

                    <div className="registration-pic-preview">
                        {this.state.picPreview.preview && (
                            <img
                                style={{ width: '100px', height: '100px' }}
                                src={this.state.picPreview.preview}
                                alt=""
                            />
                        )}
                    </div>

                    {this.state.errorMessage && (
                        <span className="text-muted">
                            {this.state.errorMessage}
                        </span>
                    )}

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
                        label={
                            this.state.processing
                                ? 'Processing...'
                                : 'Sign Me Up'
                        }
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
        email: state.auth.name,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginaction: bindActionCreators(loginActions, dispatch),
        logoutaction: bindActionCreators(logoutActions, dispatch),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
