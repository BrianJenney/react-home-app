import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { GoogleApiWrapper } from 'google-maps-react'

import API from '../../../api/helpers.js';
import HousePics from './HousePics';
import '../../../styles/search.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as loginActions from '../../../actions/login';
import * as logoutActions from '../../../actions/logout';
import * as mapActions from '../../../actions/mapMarker';

import Logo from '../../../img/logo-micasa.png';

class UserSearch extends Component {

    constructor(props){
        super(props)
        this.state={
            autoComplete: null,
            results: [],
            bedRooms: null,
            propertyType: null,
            maxPrice: Infinity,
            minPrice: 0,
            address: null
        }
    }

    handleAddressChange=(e)=>{
        let input = e.target.value;
        this.callAddressAutoComplete(input);
    }

    callAddressAutoComplete=(input)=>{
        const google = this.props.google;
        let autoComplete = new google.maps.places.Autocomplete(
            document.getElementById('address'),
            {types: ['geocode']}
        )

        autoComplete.addListener('place_changed', ()=>{
            this.cb(autoComplete);
        });
    }

    cb=(ac)=>{
       let address = ac.getPlace().formatted_address;
       this.setState({address: address}, this.searchHomes)
    }

    handleChange=(type, event, index, val)=>{
        let query = {};
        query[type] = val;
        this.setState(query, this.searchHomes)
    }

    searchHomes=()=>{
        let searchObj = {};
        searchObj.propertyType = this.state.propertyType;
        searchObj.bedRooms = this.state.bedRooms;
        searchObj.maxPrice = this.state.maxPrice;
        searchObj.minPrice = this.state.minPrice;
        searchObj.address = this.state.address;

        API.searchForHomes(searchObj).then((response)=>{
            this.setState({results: response.data});
            this.props.mapActions.addMapMarker(response);
        });
    }

    render() {
        return (
            <Card className="col-md-5 user-search">
                <div className="header row">
                    <div className="col-md-6">
                    <img src={Logo} alt=""/>
                    </div>
                    
                    <div className="col-md-6 text-right buy-sell">
                        <p>Buy</p>
                        <p>Sell</p>
                        <p>Login</p>
                    </div>
                </div>
                <input 
                type="text" 
                className="form-control"
                placeholder="Search for your home"
                id="address"
                onChange={this.handleAddressChange.bind(this)}/>

                <div className="search-options row">
                    <div className="col-md-3">
                        <SelectField
                        className="user-select lg"
                        floatingLabelText="Type"
                        value={this.state.propertyType}
                        onChange={this.handleChange.bind(null, 'propertyType')}
                        >
                            <MenuItem value={'house'} primaryText="Singe Family Home" />
                            <MenuItem value={'townhouse'} primaryText="Town House" />
                            <MenuItem value={'condo'} primaryText="Condo" />
                        </SelectField>
                    </div>
                    <div className="col-md-3">
                        <SelectField
                        floatingLabelText="Beds"
                        className="user-select"
                        value={this.state.bedRooms}
                        onChange={this.handleChange.bind(null, 'bedRooms')}
                        >
                            <MenuItem value={1} primaryText="+1" />
                            <MenuItem value={2} primaryText="+2" />
                            <MenuItem value={3} primaryText="+3" />
                            <MenuItem value={4} primaryText="+4" />
                            <MenuItem value={5} primaryText="+5" />
                        </SelectField>
                    </div>
                    <div className="col-md-3">
                        <SelectField
                        floatingLabelText="Price"
                        className="user-select"
                        value={this.state.maxPrice}
                        onChange={this.handleChange.bind(null, 'maxPrice')}
                        >
                            <MenuItem value={'all'} primaryText="All" />
                            <MenuItem value={500000} primaryText="<500K" />
                            <MenuItem value={1000000} primaryText="<1M" />
                        </SelectField>
                    </div>
                </div>

                <HousePics pics={this.state.results}/>

            </Card>
        );
  }
}

function mapStateToProps(state){
    return {
        id: state.loggedIn.id,
        email: state.loggedIn.name,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        loginaction: bindActionCreators(loginActions, dispatch),
        logoutaction: bindActionCreators(logoutActions, dispatch),
        mapActions: bindActionCreators(mapActions, dispatch),
    }
};

const WrappedContainer = GoogleApiWrapper({
    apiKey: 'AIzaSyBd8HrEYJVSBoNvYs-fWVynMBBHgQbD1mo',    
})(UserSearch)
export default connect(mapStateToProps, mapDispatchToProps)(WrappedContainer);