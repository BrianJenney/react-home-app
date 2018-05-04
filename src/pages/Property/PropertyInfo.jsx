import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import API from '../../api/helpers'
import moment from 'moment';
import '../../styles/propertyInfo.css';
import ChatBox from '../MyMessages/components/ChatBox';

const FontAwesome = require('react-fontawesome');

class Property extends Component {

    state = {
        property: null,
        mainImg: null,
        open: false,
        messages: [],
    }

    componentDidMount=()=>{
        API.getHome(this.props.match.params.id).then((response)=>{
            this.setState({mainImg: response.data[0].imgs[0], property: response.data[0]});
        });
    }

    openMessage=()=>{
        this.setState({open: true});
    }

    render() {
        return(
            <div>
                {this.state && this.state.property &&
                <div style={{marginBottom: 200}}>
                    <div className="row">
                        <div className="col-7">
                            <img className="img-fluid details-main-img" src={this.state.mainImg} alt={this.state.property._id}/>
                        </div> 
                        <div className="col-5 contact">
                            <h2>${this.state.property.price}</h2>

                            <button className="btn btn-default btn-offer">
                            Send Offer
                            </button>
                            <div className="btn-toolbar">
                                <button className="btn btn-default">
                                Get Prequalified
                                </button>
                                <button 
                                className="btn btn-default"
                                onClick={this.openMessage}>
                                    Message Owner
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="details">
                        <div className="address-details">
                            <h3>{this.state.property.address}, {this.state.property.city} {this.state.property.state}, {this.state.property.zipCode}</h3>
                        </div>
                        <div className="property-details">
                            <span>
                                <FontAwesome name='bed' />
                                {this.state.property.bedRooms} beds
                            </span>
                            <span>
                                <FontAwesome name='bath' />
                                {this.state.property.bathRooms} baths
                            </span>
                            <span>
                                <FontAwesome name='crop' />
                                {this.state.property.sqFeet} sq ft
                            </span>
                            <span>
                                <FontAwesome name='wrench' />
                                {moment(this.state.property.yearBuilt).get('year')}
                            </span>
                            <span>
                                <FontAwesome name='home' />
                                {this.state.property.propertyType}
                            </span>
                        </div>
                        <div className="description">
                            <p>{this.state.property.description}</p>
                        </div>
                    </div>
                </div>
                }
                <ChatBox 
                messages={this.state.messages}
                open={this.state.open}
                />
                <NavBar selectedIndex={1}/>
            </div>
        )
    }
}

export default Property;