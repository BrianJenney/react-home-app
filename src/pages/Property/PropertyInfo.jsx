import React, { Component } from "react";
import NavBar from "../../components/BreadcrumbNav";
import TopNav from "../../components/TopNav";
import API from "../../api/helpers";
import moment from "moment";
import { Link } from "react-router-dom";
import "../../styles/propertyInfo.css";
import DialogModal from "../../components/modals/Message";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as loginActions from "../../actions/login";
import * as logoutActions from "../../actions/logout";

const FontAwesome = require("react-fontawesome");

class Property extends Component {
    state = {
        property: null,
        mainImg: null,
        monthlyPayment: 0,
        open: false,
        messages: [],
        user: null
    };

    componentDidMount = () => {
        API.getHome(this.props.match.params.id).then(response => {
            this.setState({
                mainImg: response.data.doc.imgs[0],
                property: response.data.doc,
                monthlyPayment: response.data.monthly,
                user: response.data.user
            });
        });
    };

    closeModal = () => {
        this.setState({ open: false });
    };

    openMessage = () => {
        this.setState({ open: true });
    };

    render() {
        return (
            <div>
                <TopNav />
                {this.state && this.state.property && (
                    <div style={{ marginBottom: 200 }}>
                        <div className="row">
                            <div className="col-7">
                                <img
                                    className="img-fluid details-main-img"
                                    src={this.state.mainImg}
                                    alt={this.state.property._id}
                                />
                            </div>
                            <div className="col-5 contact">
                                <div className="contact-actions">
                                    <h2>${this.state.property.price}</h2>
                                    <p className="text-muted">
                                        ${this.state.monthlyPayment}
                                        /mo (Est Mortgage)
                                    </p>

                                    <button
                                        onClick={() => {
                                            this.props.history.replace(
                                                `/buyerdashboard/${
                                                    this.state.property._id
                                                }`
                                            );
                                        }}
                                        className="btn btn-default btn-offer"
                                    >
                                        Make an Offer
                                    </button>
                                    <div className="btn-toolbar">
                                        <a href="https://rocketmortgage.com">
                                            <button className="btn btn-default">
                                                Get Prequalified
                                            </button>
                                        </a>

                                        <button
                                            className="btn btn-default"
                                            onClick={this.openMessage}
                                        >
                                            Message Owner
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="details">
                            <div className="address-details">
                                <h3>
                                    {this.state.property.address},{" "}
                                    {this.state.property.city}{" "}
                                    {this.state.property.state},{" "}
                                    {this.state.property.zipCode}
                                </h3>
                            </div>
                            <div className="property-details">
                                <span>
                                    <FontAwesome name="bed" />
                                    {this.state.property.bedRooms} beds
                                </span>
                                <span>
                                    <FontAwesome name="bath" />
                                    {this.state.property.bathRooms} baths
                                </span>
                                <span>
                                    <FontAwesome name="crop" />
                                    {this.state.property.sqFeet} sq ft
                                </span>
                                <span>
                                    <FontAwesome name="wrench" />
                                    {moment(this.state.property.yearBuilt).get(
                                        "year"
                                    )}
                                </span>
                                <span className="details-property-type">
                                    <FontAwesome name="home" />
                                    {this.state.property.propertyType}
                                </span>
                            </div>
                            <div className="description">
                                <p>{this.state.property.description}</p>
                            </div>
                        </div>
                    </div>
                )}
                <DialogModal
                    closeModal={this.closeModal.bind(this)}
                    open={this.state.open}
                    propertyInfo={this.state.property}
                    senderEmail={this.props.email}
                    user={this.state.user}
                />
                <NavBar selectedIndex={1} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        id: state.loggedIn.id,
        email: state.loggedIn.name
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
)(Property);
