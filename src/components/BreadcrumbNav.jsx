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
                this.props.history.push("/nav");
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
                this.props.history.push("/mymessages");
                break;
            default:
                return;
        }
    };

    render() {
        return (
            <footer>
              <div>
                <nav
                    className="bottom-nav"
                    selectedIndex={this.props.selectedIndex}
                >
                  <ol>
                    <li>
                      <a label="Nav" icon={home} onClick={() => this.select(0)}>
                        Nav
                      </a>
                    </li>
                    <li>
                      <a label="Post" icon={list} onClick={() => this.select(1)}>
                        Post
                      </a>
                    </li>
                      <a label="House Hunt" icon={search} onClick={() => this.select(2)}>
                        House Hunt
                      </a>
                    <li className = "last-li">
                      <a label="Messages" icon={envelope} onClick={() => this.select(4)} >
                        Message
                      </a>
                    </li>
                    <li>
                      <a
                        label="Log Out"
                        icon={signout}
                        onClick={() => this.select(3)}
                      >Log Out</a>
                    </li>
                  </ol>
                </nav>
                </div>
            </footer>
        );
    }
}

export default withRouter(NavBar);
