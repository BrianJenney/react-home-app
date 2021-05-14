import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../../actions/login';
import * as logoutActions from '../../actions/logout';
import API from '../../api/helpers.js';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import '../../styles/sign-in.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            processing: false,
        };
    }

    onChange = (e) => {
        let user = {};
        user[e.target.id] = e.target.value;
        this.setState(user);
    };

    login = () => {
        this.setState({ processing: true });
        API.login(this.state)
            .then((response) => {
                if (typeof response.data.errors !== `undefined`) {
                    this.setState({
                        error: response.data.message,
                        processing: false,
                    });
                    return;
                }

                if (response.data.length === 0) {
                    this.setState({
                        processing: false,
                        error:
                            'This user does not exist, or your password is invalid',
                    });
                    return;
                }
                this.addUserToStore(response);

                const user = response.data.userInfo;
                this.props.loginaction.login(user);
                const redirect =
                    (user.userType || 'buyer').toLowerCase() === 'buyer'
                        ? '/listings'
                        : '/dashboard';
                this.props.history.push(redirect);
            })
            .finally(() => {
                this.setState({ processing: false });
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

    render() {
        return (
            <div>
                <div className="col-xs-6 col-xs-offset-3 sign-up-wrapper">
                    <center>
                        <div class="banner1"></div>
                    </center>
                    <div class="signupinput">
                        <TextField
                            floatingLabelText="Enter your email to join!"
                            onChange={this.onChange.bind(this)}
                            fullWidth={true}
                            id="email"
                            type="text"
                        />
                        <a
                            className="sign-up-actions"
                            href="https://www.micasa.app/#/sign-up"
                        ></a>
                    </div>
                    <div className="sign-up-fields">
                        <TextField
                            floatingLabelText="Email"
                            onChange={this.onChange.bind(this)}
                            fullWidth={true}
                            id="email"
                            type="text"
                        />
                        <span>
                            <TextField
                                floatingLabelText="Password"
                                onChange={this.onChange.bind(this)}
                                fullWidth={true}
                                id="password"
                                maxLength="12"
                                type="password"
                            />
                        </span>
                        <a className="sign-in-actions">
                            <RaisedButton
                                primary={true}
                                disabled={
                                    this.state.password.length < 1 ||
                                    this.state.email.length < 1 ||
                                    this.state.processing
                                }
                                onClick={this.login}
                                label={
                                    this.state.processing
                                        ? 'Processing...'
                                        : 'Login'
                                }
                            />
                        </a>
                    </div>
                    <p style={{ marginTop: '1em' }} className="text-muted">
                        {this.state.error}
                    </p>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginaction: bindActionCreators(loginActions, dispatch),
        logoutaction: bindActionCreators(logoutActions, dispatch),
    };
}
export default connect(null, mapDispatchToProps)(SignIn);
