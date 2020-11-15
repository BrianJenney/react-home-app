import React from 'react';
import Popover from '@material-ui/core/Popover';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { switchUser } from '../actions/switchUser';
import greenLogo from '../img/micasa_green_logo.svg';
import API from '../api/helpers';
import '../styles/breadcrumb-nav.css';
import { logout } from '../actions/logout';

const home = <i className="material-icons">home</i>;
const search = <i className="material-icons">location_searching</i>;
const signout = <i className="material-icons">highlight_off</i>;
const envelope = <i className="material-icons">message</i>;

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPage: 'dash',
            anchorEl: null,
            open: false,
        };
    }

    handleClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
            open: true,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
            open: false,
        });
    };

    logoutAndExit = () => {
        this.props.logout();
        this.props.history.push('/');
    };

    select = (page) => {
        this.setState({ selectedPage: page });
        switch (page) {
            case 'dash':
                this.props.history.push('/dashboard');
                break;
            case 'post':
                this.props.history.push('/addproperty');
                break;
            case 'listings':
                this.props.history.push('/listings');
                break;
            case 'login':
                this.props.history.push('/');
                break;
            case 'register':
                this.props.history.push('/sign-up');
                break;
            case 'messages':
                this.props.history.push('/messages');
                break;
            default:
                return;
        }
    };

    switchUserType = (userType) => {
        this.handleClose();
        const { id, switchUser } = this.props;
        API.updateProfile({
            id,
            userType,
        });
        switchUser({ userType });
    };

    render() {
        const { userType, user } = this.props;
        const { anchorEl, open } = this.state;

        return (
            <footer className="bread-crumb-nav">
                <div>
                    <nav>
                        <ul>
                            <li>
                                <img
                                    className="micasa-nav-logo"
                                    src={greenLogo}
                                />
                            </li>
                            <li>
                                <a
                                    className="crumb-link"
                                    onClick={this.handleClick}
                                >
                                    {userType.toUpperCase()}
                                </a>
                                <Popover
                                    id="simple-popper"
                                    open={open}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                >
                                    <li
                                        className="pop-over-item"
                                        onClick={this.switchUserType.bind(
                                            null,
                                            'buyer'
                                        )}
                                    >
                                        Buyer
                                    </li>
                                    <li
                                        className="pop-over-item"
                                        onClick={this.switchUserType.bind(
                                            null,
                                            'seller'
                                        )}
                                    >
                                        Seller
                                    </li>
                                </Popover>
                            </li>
                            <li>
                                <a
                                    label="House Hunt"
                                    className="crumb-link"
                                    icon={search}
                                    onClick={() => this.select('listings')}
                                >
                                    House Hunt
                                </a>
                            </li>
                            <li>
                                <a
                                    label="Dashboard"
                                    className="crumb-link"
                                    icon={home}
                                    onClick={() => this.select('dash')}
                                >
                                    Dashboard
                                </a>
                            </li>
                            <li className="last-li">
                                <a
                                    label="Messages"
                                    className="crumb-link"
                                    icon={envelope}
                                    onClick={() => this.select('messages')}
                                >
                                    Messages
                                </a>
                            </li>
                            {!user && (
                                <li>
                                    <a
                                        label="Sign Up"
                                        className="crumb-link"
                                        icon={signout}
                                        onClick={() => this.select('register')}
                                    >
                                        Sign Up
                                    </a>
                                </li>
                            )}
                            <li>
                                <a
                                    label="Log In"
                                    className="crumb-link"
                                    icon={signout}
                                    onClick={() =>
                                        user
                                            ? this.logoutAndExit()
                                            : this.select('login')
                                    }
                                >
                                    {user ? 'Log Out' : 'Log In'}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </footer>
        );
    }
}

function mapStateToProps(state) {
    return {
        userType: state.auth.userType,
        id: state.auth._id,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        switchUser: bindActionCreators(switchUser, dispatch),
        logout: bindActionCreators(logout, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));

NavBar.defaultProps = {
    userType: 'Buyer',
};
