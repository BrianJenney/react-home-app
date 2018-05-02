import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import API from '../../api/helpers'
import moment from 'moment';

class Property extends Component {

    state = {
        property: null,
        mainImg: null
    }

    componentDidMount=()=>{
        API.getHome(this.props.match.params.id).then((response)=>{
            this.setState({mainImg: response.data[0].imgs[0], property: response.data[0]});
        });
    }

    render() {
        return(
            <div>
                {this.state && this.state.property &&
                <div style={{marginBottom: 200}}>
                    <div className="row">
                        <div className="col-7">
                            <img className="img-fluid" src={this.state.mainImg} alt={this.state.property._id}/>
                        </div> 
                        <div className="col-5 text-center">
                            <h2>${this.state.property.price}</h2>
                            <div className="btn-toolbar">
                                <button className="btn btn-success">
                                    Make an Offer
                                </button>
                                <button className="btn btn-success">
                                    Message Owner
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="address-details">
                        <h3>{this.state.property.address}, {this.state.property.city} {this.state.property.state}, {this.state.property.zipCode}</h3>
                    </div>
                    <div className="property-details">
                        <span>
                            {this.state.property.bedRooms} beds
                        </span>
                        <span>
                            {this.state.property.bathRooms} baths
                        </span>
                        <span>
                            {moment(this.state.property.yearBuilt).get('year')}
                        </span>
                        <span>
                            {this.state.property.propertyType}
                        </span>
                    </div>
                </div>
                }
                <NavBar selectedIndex={1}/>
            </div>
        )
    }
}

export default Property;