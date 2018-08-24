import React, { Component } from "react";
import NavBar from "../../components/BreadcrumbNav";
import TopNav from "../../components/TopNav";
import API from "../../api/helpers";
import moment from "moment";
import "../../styles/propertyInfo.css";
import DialogModal from "../../components/modals/Message";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as loginActions from "../../actions/login";
import * as logoutActions from "../../actions/logout";
import TextField from '@material-ui/core/TextField';

const FontAwesome = require("react-fontawesome");

class Property extends Component {
    state = {
        property: null,
        mainImg: null,
        monthlyPayment: 0,
        open: false,
        messages: [],
        user: null,
        imgs: [],
        location: []
    };

    componentDidMount = () => {
        let imgs = [];
        API.getHome(this.props.match.params.id).then(response => {
            console.log(response);
            
            response.data.doc[0].imgs.forEach( img => {
                imgs.push(img);
            })
            this.setState({
                location: response.data.doc[0].location,
                mainImg: response.data.doc[0].imgs[0],
                property: response.data.doc[0],
                monthlyPayment: response.data.monthly,
                user: response.data.user
            });
        }).then(() => {
            this.setState({
                imgs : imgs
            })
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
            <div className="property-info">
                <TopNav />
                {this.state &&
                    this.state.property && (
                        <div className="upper" style={{ marginBottom: 200 }}>
                            <div className="row" style={{ height:600 }}>
                                <div className="col-8">
                                    <img
                                        style={{ height:620 }}
                                        className="img-fluid details-main-img"
                                        src={this.state.mainImg}
                                        alt={this.state.property._id}
                                    />
                                </div>
                                <div className="col-4 contact">
                                    <div className="contact-actions">
                                        <h2>${this.state.property.price}</h2>
                                        <p className="text-muted" style={{marginBottom:30}}>
                                            ${this.state.monthlyPayment}/mo (Est
                                            Mortgage)
                                        </p>
                                        <div className="contact-buttons" >                                        
                                            <button className="btn btn-default btn-offer btn-long">
                                                Send Offer
                                            </button>
                                            <button className="btn btn-default btn-long">
                                                Request Disclosure Package
                                            </button>
                                            <div className="btn-toolbar btn-two">
                                                <button className="btn btn-default btn-short">
                                                    Get Prequalified
                                                </button>
                                                <button className="btn btn-default btn-short" onClick={this.openMessage}>
                                                    Message Owner
                                                </button>
                                            </div>
                                        </div>
                                        <div style={{marginTop:30}}>
                                            <FontAwesome name='calendar' style={{color:"#355d91" , padding:12}}/>
                                            Set Appointment
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr style={{ marginTop: 20.5 }} />
                            <div className="lower">
                                <div className="details row" >
                                    <div className="col-10">
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
                                                <FontAwesome className="detail-icon" name="bed" size='2x'/>
                                                {this.state.property.bedRooms} beds
                                            </span>
                                            <span>
                                                <FontAwesome className="detail-icon" name="bath" size='2x'/>
                                                {this.state.property.bathRooms} baths
                                            </span>
                                            <span>
                                                <FontAwesome className="detail-icon" name="crop" size='2x'/>
                                                {this.state.property.sqFeet} sq ft
                                            </span>
                                            <span>
                                                <FontAwesome className="detail-icon" name="crop" size='2x'/>
                                                {this.state.property.sqFeet} sq ft
                                            </span>
                                            <span>
                                                <FontAwesome className="detail-icon" name="wrench" size='2x'/>
                                                {moment(
                                                    this.state.property.yearBuilt
                                                ).get("year")}
                                            </span>
                                            <span className="details-property-type">
                                                <FontAwesome name="home" size='2x'/>
                                                {this.state.property.propertyType}
                                            </span>
                                        
                                        </div>
                                        <div className="description"  >
                                            <p>{this.state.property.description}</p>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <img
                                            className="house-map"
                                            src={this.state.mainImg}
                                            alt={this.state.property._id}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="image-list">
                                <FontAwesome className="image-icon" name='heart-o' size='2x' />
                                {this.state.imgs.map(function(img, index) {
                                    return (
                                        <label key={index}>
                                            <img src={img}/>
                                        </label>
                                    );
                                })}                                
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