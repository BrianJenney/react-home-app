import React, { Component } from 'react';
import {Card} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import '../../../styles/search.css';

class UserSearch extends Component {

constructor(props){
    super(props)
    this.state={
        location: null,
        bedRooms: null,
        propertyType: null,
        price: null
    }
}

  render() {
    return (
        <Card className="col-md-4 user-search">
            <div className="header row">
                <div className="col-md-6">
                <p>micasa</p>
                </div>
                
                <div className="col-md-6 text-right buy-sell">
                    <p>Buy</p>
                    <p>Sell</p>
                </div>
            </div>
            <input 
            type="text" 
            className="form-control"
            placeholder="Search for your home"/>

            <div className="search-options row">
                <div className="col-md-3">
                    <SelectField
                    className="user-select"
                    floatingLabelText="Type"
                    value={this.state.propertyType}
                    // onChange={this.handleChange}
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
                    // onChange={this.handleChange}
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
                    value={this.state.price}
                    // onChange={this.handleChange}
                    >
                        <MenuItem value={'all'} primaryText="All" />
                        <MenuItem value={500000} primaryText="<500K" />
                        <MenuItem value={1000000} primaryText="<1M" />
                    </SelectField>
                </div>
            </div>
        </Card>
    );
  }
}

export default UserSearch;