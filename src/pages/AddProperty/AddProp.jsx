import React from 'react';

import API from '../../api/helpers.js';
import NavBar from '../../components/NavBar';
import { GoogleApiWrapper } from 'google-maps-react'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../../actions/login';
import * as mapActions from '../../actions/mapMarker';

class AddProp extends React.Component {

  constructor(props){
    super(props)

    this.state={
      autoComplete: null,
      disabled: false,
      imgs:[],
      price: 0,
     	address: null,
      propertyType: null,
      owner: null,
	    balance: 0,
	    phone: null,
	    occupancyStatus: null,
	    description: null,
      timeFrame: null,
      bedRooms: 0,
      bathRooms: 0,
      yearBuilt: Date.now(),
    }
  }

  handleAddressChange=(e)=>{
    let input = e.target.value;
    this.callAddressAutoComplete(input);
  };

  onDrop=(file)=>{
    console.log(file);
    this.state.imgs.push(
      file[0]
    );
  };

  callAddressAutoComplete=(input)=>{
    const google = this.props.google;
    let autoComplete = new google.maps.places.Autocomplete(
        document.getElementById('address'),
        {types: ['geocode']}
    )

    autoComplete.addListener('place_changed', ()=>{
        this.callBack(autoComplete);
    });
  };

  callBack=(ac)=>{
    let address = ac.getPlace().formatted_address;
    this.setState({address: address}, this.searchHomes)
  };

  onChange=(e)=>{
    let propertyInfo = {};
    propertyInfo[e.target.id] = e.target.value;
    this.setState(propertyInfo);
  };

  handleChange=(type, event, index, val)=>{
    let query = {};
    query[type] = val;
    this.setState(query);
  };

  submitProperty=()=>{
    let self = this;
    
    const property = this.state;

    API.posthome(property).then(function(response){
      self.props.history.push("/nav");
    });
  };

   render() {
     
      return (     
         <div>
          <NavBar selectedIndex={1}/>

            <Dropzone 
              onDrop={this.onDrop} 
              multiple 
              accept="image/*">
              <p>Drop your files or click here to upload</p>
            </Dropzone>

            <input 
              type="text" 
              className="form-control"
              placeholder="Address"
              id="address"
              onChange={this.handleAddressChange.bind(this)}/>
              
            <div className="col-md-6 col-md-offset-3">

              <SelectField
              floatingLabelText="Property Type"
              value={this.state.propertyType}
              id="propertyType"
              onChange={this.handleChange.bind(null, 'propertyType')}>
                  <MenuItem value={'Single Family'} primaryText="Singe Family" />
                  <MenuItem value={'Duplex'} primaryText="Duplex" />
                  <MenuItem value={'Multi-Unit'} primaryText="Multi-Unit" />
                  <MenuItem value={'Condo'} primaryText="Condo" />
                  <MenuItem value={'Townhouse'} primaryText="Townhouse" />
              </SelectField>

              <SelectField
              floatingLabelText="Bedrooms"
              value={this.state.bedRooms}
              id="propertyType"
              onChange={this.handleChange.bind(null, 'bedRooms')}>
                  <MenuItem value={1} primaryText='1'/>
                  <MenuItem value={2} primaryText="2" />
                  <MenuItem value={3} primaryText="3" />
                  <MenuItem value={4} primaryText="4" />
                  <MenuItem value={5} primaryText="5" />
                  <MenuItem value={6} primaryText="6" />
                  <MenuItem value={7} primaryText="7" />
                  <MenuItem value={8} primaryText="8" />
              </SelectField>

              <SelectField
              floatingLabelText="Bathrooms"
              value={this.state.bathRooms}
              onChange={this.handleChange.bind(null, 'bathRooms')}>
                  <MenuItem value={1} primaryText='1'/>
                  <MenuItem value={2} primaryText="2" />
                  <MenuItem value={3} primaryText="3" />
                  <MenuItem value={4} primaryText="4" />
                  <MenuItem value={5} primaryText="5" />
                  <MenuItem value={6} primaryText="6" />
                  <MenuItem value={7} primaryText="7" />
                  <MenuItem value={8} primaryText="8" />
              </SelectField>

              <TextField
              floatingLabelText="Owner"
              onChange={this.onChange.bind(this)}
              fullWidth={true}
              type="text"
              id="owner"/>

              <TextField
              floatingLabelText="Remaining Balance"
              onChange={this.onChange.bind(this)}
              fullWidth={true}
              type="number"
              id="balance"/>

              <br/>
            
              <TextField
              floatingLabelText="Phone"
              onChange={this.onChange.bind(this)}
              fullWidth={true}
              type="phone"
              id="phone"/>

              <SelectField
              floatingLabelText="Occupancy Status"
              value={this.state.occupancyStatus}
              onChange={this.handleChange.bind(null, 'occupancyStatus')}>
                  <MenuItem value={'Second Home'} primaryText="Second Home" />
                  <MenuItem value={'Rental'} primaryText="Rental" />
                  <MenuItem value={'Owner Occupied'} primaryText="Owner Occupied" />
              </SelectField>

              <TextField
              floatingLabelText="Description"
              onChange={this.onChange.bind(this)}
              fullWidth={true}
              type="text"
              id="description"/>

              <TextField
              floatingLabelText="Price"
              onChange={this.onChange.bind(this)}
              fullWidth={true}
              type="number"
              id="price"/>

              <SelectField
              floatingLabelText="Time Frame"
              value={this.state.timeFrame}
              onChange={this.handleChange.bind(null, 'timeFrame')}>
                  <MenuItem value={60} primaryText="60 Days" />
                  <MenuItem value={90} primaryText="90 Days" />
                  <MenuItem value={120} primaryText="120 Days" />
              </SelectField>

	            <RaisedButton 
              primary={true}
              label="Add Property"
              onClick={this.submitProperty}/>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state){
    return {
        id: state.loggedIn.id,
        email: state.loggedIn.name
    };
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch),
        mapActions: bindActionCreators(mapActions, dispatch),
    }
};

const WrappedContainer = GoogleApiWrapper({
    apiKey: 'AIzaSyBd8HrEYJVSBoNvYs-fWVynMBBHgQbD1mo',    
})(AddProp);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedContainer);

