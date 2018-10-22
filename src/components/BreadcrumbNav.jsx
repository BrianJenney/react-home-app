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
        selectedIndex: 0
    };

    select = page => {
        this.setState({ selectedIndex: page });
        switch (page) {
            case 0:
                this.props.history.push("/dashboard");
                break;
            case 1:
                this.props.history.push("/addproperty");
                break;
            case 2:
                this.props.history.push("/listings");
                break;
            case 3:
                this.props.history.push("/");
                break;
            case 4:
                this.props.history.push("/messages");
                break;
            default:
                return;
        }
    };

    render() {
        return (
            <footer>
                <div>
                    <nav className="bottom-nav" onClick={this.props.onclick}>
                        <ol>
                            <li>
                                <a
                                    label="Dashboard"
                                    className="crumb-link"
                                    icon={home}
                                    onClick={() => this.select(0)}
                                >
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a
                                    label="Post"
                                    className="crumb-link"
                                    icon={list}
                                    onClick={() => this.select(1)}
                                >
                                    Post
                                </a>
                            </li>
                            <a
                                label="House Hunt"
                                className="crumb-link"
                                icon={search}
                                onClick={() => this.select(2)}
                            >
                                House Hunt
                            </a>
                            <li className="last-li">
                                <a
                                    label="Messages"
                                    className="crumb-link"
                                    icon={envelope}
                                    onClick={() => this.select(4)}
                                >
                                    Message
                                </a>
                            </li>
                            <li>
                                <a
                                    label="Log Out"
                                    className="crumb-link"
                                    icon={signout}
                                    onClick={() => this.select(3)}
                                >
                                    Log Out
                                </a>
                            </li>
                        </ol>
                    </nav>
                </div>
            </footer>
        );
    }
}

export default withRouter(NavBar);
