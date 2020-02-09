import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as loginActions from "../../actions/login";
import * as logoutActions from "../../actions/logout";
import API from "../../api/helpers.js";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import NavBar from "../../components/BreadcrumbNav";
import "../../styles/sign-in.css";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            processing: false
        };
    }

    onChange = e => {
        let user = {};
        user[e.target.id] = e.target.value;
        this.setState(user);
    };

    login = () => {
        API.login(this.state).then(response => {
            if (typeof response.data.errors !== `undefined`) {
                this.setState({
                    error: response.data.message,
                    processing: false
                });
                return;
            }

            if (response.data.length === 0) {
                this.setState({
                    error:
                        "This user does not exist, or your password is invalid"
                });
                return;
            }

            this.addUserToStore(response);
        });
    };

    addUserToStore = response => {
        if (response.data.token) {
            this.saveToken(response.data.token);
        }

        const user = response.data.userInfo;

        this.props.loginaction.login(user);
        this.props.history.push("/listings");
    };

    saveToken = token => {
        const userToken = JSON.stringify(token);
        localStorage.setItem("casaToken", userToken);
    };

    render() {
        return (
            <div>
                <div className="col-xs-6 col-xs-offset-3 sign-up-wrapper">
                    <h1 className="sign-up-header">Welcome to Micasa</h1>
                    <div className="sign-up-fields">
                        <TextField
                            floatingLabelText="Email"
                            onChange={this.onChange.bind(this)}
                            fullWidth={true}
                            id="email"
                            type="text"
                        />

                        <TextField
                            floatingLabelText="Password"
                            onChange={this.onChange.bind(this)}
                            fullWidth={true}
                            id="password"
                            maxLength="12"
                            type="password"
                        />
                    </div>
                    <p className="text-muted">{this.state.error}</p>
                    <div className="sign-in-actions">
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
                                    ? "Processing..."
                                    : "Login"
                            }
                        />
                    </div>
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
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
