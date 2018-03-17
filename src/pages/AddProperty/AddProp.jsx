import React from 'react';

import API from '../../api/helpers.js';
import NavBar from '../../components/NavBar';
import { GoogleApiWrapper } from 'google-maps-react'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
	    mortgageBalance: 0,
	    phone: null,
	    occupancyStatus: null,
	    description: null,
	    timeFrame: null
    }
  }

  handleAddressChange=(e)=>{
    let input = e.target.value;
    this.callAddressAutoComplete(input);
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
    let picInfo = {};
    picInfo[e.target.id] = e.target.value;
    this.setState(picInfo);
  };

  submitPic=()=>{
    let self = this;
    
    const picItem = this.state;

    API.posthome(picItem).then(function(response){
      self.props.history.push("/nav");
    });
  };

   render() {
     
      return (     
         <div>
          <NavBar selectedIndex={1}/>
            <input 
              type="text" 
              className="form-control"
              placeholder="Address"
              id="address"
              onChange={this.handleAddressChange.bind(this)}/>
              
            <div className="col-md-6 col-md-offset-3">
              <TextField
              floatingLabelText="Enter a URL"
              onChange={this.onChange.bind(this)}
              fullWidth={true}
              type="string"
              id="imgUrl"/>

              <br/>

              <TextField
              floatingLabelText="Price"
              onChange={this.onChange.bind(this)}
              fullWidth={true}
              type="number"
              id="price"/>

              <br/>
            
              <TextField
              floatingLabelText="Zip"
              onChange={this.onChange.bind(this)}
              fullWidth={true}
              type="number"
              id="zip"/>

              <TextField
              floatingLabelText="Zip"
              onChange={this.onChange.bind(this)}
              fullWidth={true}
              type="number"
              id="zip"/>

	      <RaisedButton 
              primary={true}
              label="Add Property"
              onClick={this.submitPic}
	      />
	      
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

