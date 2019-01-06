import React from "react";
import FontIcon from "material-ui/FontIcon";
import { withRouter } from "react-router";
import "../styles/breadcrumb-nav.css";
const home = <i className="material-icons">home</i>;
const list = <FontIcon className="material-icons">view_list</FontIcon>;
const search = <i className="material-icons">location_searching</i>;
const signout = <i className="material-icons">highlight_off</i>;
const envelope = <i className="material-icons">message</i>;

class NavBar extends React.Component {
    state = {
        selectedPage: "dash"
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

    render() {
        const isActive = this.selectedPage;
        return (
            <footer>
                <div>
                    <nav className="bottom-nav">
                        <ul>
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

export default withRouter(NavBar);
