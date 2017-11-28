
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../../actions/login';
import * as logoutActions from '../../actions/logout';

import API from '../../api/helpers.js';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class SignIn extends React.Component{

constructor(props){
  super(props)

  this.state = {
    income:0,
    SSN:0,
    userType: '',
    email: '',
    password: '',
    error: '',
    display: 'none'
  };
};

componentDidMount=()=>{
  this.props.logoutaction.logout();
};

onChange=(e)=>{
  let user = {};
  user[e.target.id] = e.target.value;
  this.setState(user);
};

submitUser=(type)=>{
  if(type === 'login'){
    this.login();
  }else{
    this.register();
  }
};

login=()=>{
  API.login(this.state).then((response)=>{
    if(typeof response.data.errors !== `undefined`){ 
      this.setState({error: response.data.message});
      return;
    }

    if(response.data.length === 0){
      this.setState({error: 'This user does not exist, or your password is invalid'});
      return;
    }
  
    const user={
      isLogged: true,
      name: this.state.email,
      id: response.data._id
    };

    this.props.loginaction.login(user); 
    this.props.history.push("/nav");

  })
};

register=()=>{
  API.register(this.state).then((response)=>{
    if(typeof response.data.errmsg !== `undefined`){ 
      this.setState({error: response.data.errmsg.indexOf('duplicate') ? 'That username is already taken' : response.data.errmsg});
      return;
    }
  
    const user={
      isLogged: true,
      name: this.state.email,
      id: response.data._id
    };

    this.props.loginaction.login(user); 
    this.props.history.push("/nav");

  })
};

showRegister=()=>{
  if(this.state.display === 'block')
    this.setState({display: 'none'});
  else
    this.setState({display: 'block'});
};


render(){
  return(
    <div>

     <div className="col-xs-6 col-xs-offset-3">
        <br/>
        <br/>

        <TextField
            floatingLabelText="Email"
            onChange={this.onChange.bind(this)}
            fullWidth={true}
            id="email"
            type="text"/>

        <br/>

        <TextField
          floatingLabelText="Password"
          onChange={this.onChange.bind(this)}
          fullWidth={true}
          id="password"
          maxLength="8"
          type="password"/>

          <br/>
          <br/>
          <span 
          style={{marginTop: 30}}
          onClick={this.showRegister}>New User?</span>

          <br/>

        <div style={{display: this.state.display}}>

          <TextField
            floatingLabelText="SSN"
            onChange={this.onChange.bind(this)}
            fullWidth={true}
            id="SSN"
            maxLength="8"
            type="password"/>

          <br/>

          <TextField
            floatingLabelText="Income"
            onChange={this.onChange.bind(this)}
            fullWidth={true}
            type="number"
            id="income"/>

          <br/>
          <br/>

          <RadioButtonGroup name="buyerType" defaultSelected="not_light">
          <RadioButton
            onClick={this.onChange.bind(this)}
            id="userType"
            value="buyer"
            label="Buyer"
          />
          <RadioButton
            onClick={this.onChange.bind(this)}
            id="userType"
            value="seller"
            label="Seller"
          />
        </RadioButtonGroup>

        </div>

        <p className="text-muted">{this.state.error}</p>

        <RaisedButton 
          style={{marginRight: `5%`}}
          primary={true}
          disabled={this.state.password.length < 1 ||
          this.state.email.length < 1}
          onClick={this.submitUser.bind(this, 'login')}
          label="Login"/>

        <RaisedButton 
          primary={true}
          disabled={this.state.password.length < 1 ||
          this.state.email.length < 1 || this.state.SSN.toString().length < 8 || this.state.userType === '' || Number(this.state.income) < 1}
          onClick={this.submitUser.bind(this, 'register')}
          label="Register"/>
      </div>

      

    </div>
  )
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
        loginaction: bindActionCreators(loginActions, dispatch),
        logoutaction: bindActionCreators(logoutActions, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

