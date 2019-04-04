import React from "react";
import Popover from "@material-ui/core/Popover";
import FontIcon from "material-ui/FontIcon";
import { withRouter } from "react-router";
import "../styles/breadcrumb-nav.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { switchUser } from "../actions/switchUser";
const home = <i className="material-icons">home</i>;
const list = <FontIcon className="material-icons">view_list</FontIcon>;

const search = <i className="material-icons">location_searching</i>;
const signout = <i className="material-icons">highlight_off</i>;
const envelope = <i className="material-icons">message</i>;

class NavBar extends React.Component {
  state = {
    selectedPage: "dash",
    anchorEl: null
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  onChange = e => {
    this.props.switchUser(e.target.value);
  };

  select = page => {
    this.setState({ selectedPage: page });
    switch (page) {
      case "dash":
        this.props.history.push("/dashboard");
        break;
      case "post":
        this.props.history.push("/addproperty");
        break;
      case "listings":
        this.props.history.push("/listings");
        break;
      case "login":
        this.props.history.push("/");
        break;
      case "register":
        this.props.history.push("/sign-up");
        break;
      case "messages":
        this.props.history.push("/messages");
        break;
      default:
        return;
    }
  };

  switchUserType = type => {
    console.log(type);
    this.props.switchUser(type);
    this.setState({
      open: false
    });
  };

  render() {
    const { userType } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const isActive = this.selectedPage;
    return (
      <footer>
        <div>
          <nav className="bottom-nav">
            <ul>
              <li onClick={this.handleClick}>
                {userType.toUpperCase()}
                <Popover
                  id="simple-popper"
                  open={open}
                  anchorEl={anchorEl}
                  onClose={this.handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                >
                  <li onClick={this.switchUserType.bind(null, "buyer")}>
                    Buyer
                  </li>
                  <li onClick={this.switchUserType.bind(null, "seller")}>
                    Seller
                  </li>
                </Popover>
              </li>
              <li>
                <a
                  label="House Hunt"
                  className="crumb-link"
                  icon={search}
                  onClick={() => this.select("listings")}
                >
                  House Hunt
                </a>
              </li>
              <li>
                <a
                  label="Dashboard"
                  className="crumb-link"
                  icon={home}
                  onClick={() => this.select("dash")}
                >
                  Dashboard
                </a>
              </li>
              <li className="last-li">
                <a
                  label="Messages"
                  className="crumb-link"
                  icon={envelope}
                  onClick={() => this.select("messages")}
                >
                  Messages
                </a>
              </li>
              <li>
                <a
                  label="Sign Up"
                  className="crumb-link"
                  icon={signout}
                  onClick={() => this.select("register")}
                >
                  Sign Up
                </a>
              </li>
              <li>
                <a
                  label="Log In"
                  className="crumb-link"
                  icon={signout}
                  onClick={() => this.select("login")}
                >
                  Log In
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
    userType: state.loggedIn.userType
  };
}

function mapDispatchToProps(dispatch) {
  return {
    switchUser: bindActionCreators(switchUser, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
);
