import React from "react";
import FontIcon from "material-ui/FontIcon";

import { withRouter } from "react-router";
import Logo from "../img/logo-micasa.png";

import "../styles/top-nav.css";

class TopNav extends React.Component {
    state = {
        selectedIndex: 0
    };

    select = page => {
        this.setState({ selectedIndex: page });
        switch (page) {
            case 0:
                this.props.history.push("/listings");
                break;
            case 1:
                this.props.history.push("/addproperty");
                break;
            case 2:
                this.props.history.push("/");
                break;
            default:
                return;
        }
    };

    render() {
        return (
            <div className="top-nav">
                <div className="logo">
                    <img src={Logo} />
                </div>
                <div className="nav-options">
                    <p onClick={() => this.select(0)}>Buy</p>
                    <p onClick={() => this.select(1)}>Sell</p>
                    <p onClick={() => this.select(2)}>Logout</p>
                </div>
            </div>
        );
    }
}

export default withRouter(TopNav);
