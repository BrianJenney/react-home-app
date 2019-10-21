import React from "react";
import { Collapse } from "reactstrap";
import API from "../../../api/helpers";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class ListHome extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            homes: [],
            numbers: 0
        };
    }

    componentDidMount() {
        let homes = [];

        API.getListingHomes(this.props.userEmail)
            .then(responses => {
                const data = responses.data;

                data.forEach(home => {
                    homes.push(home);
                });
            })
            .then(() => {
                this.setState({ homes: homes });
            });
    }

    goToListHome = () => {
        this.props.history.push("addproperty");
    };

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <div className="card p-3">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1 className="pr-4">1</h1>
                    <span className="section-title">ListHome</span>
                    <span
                        className={
                            this.state.collapse
                                ? "fa fa-2x fa-angle-up pl-4"
                                : "fa fa-2x fa-angle-down pl-4"
                        }
                        onClick={this.toggle}
                    />
                </div>
                <Collapse isOpen={this.state.collapse}>
                    {this.state.homes.length > 1 && (
                        <div>Total Homes : {this.state.homes.length}</div>
                    )}

                    <ul>
                        {this.state.homes.map(function(home, index) {
                            return (
                                <div>
                                    <li
                                        key={index}
                                        style={{
                                            display: "flex",
                                            width: "100%"
                                        }}
                                    >
                                        <img src={home.imgs[0]} alt="" />
                                    </li>
                                    <li>
                                        <Link to={`/edit/property/${home._id}`}>
                                            {home.address}
                                        </Link>
                                    </li>
                                </div>
                            );
                        })}
                    </ul>

                    <button
                        className="btn btn-primary"
                        onClick={this.goToListHome}
                    >
                        List your house
                    </button>
                </Collapse>
            </div>
        );
    }
}
export default withRouter(ListHome);
