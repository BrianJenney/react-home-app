import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import API from '../../../api/helpers.js';

export default class DialogExampleModal extends React.Component {

  constructor(props){
    super(props)
    this.state= {
      disabled: false,
      userMessage: '',
      recipient: '',
      messages: []
    };
  };

  componentWillReceiveProps=(nextProps)=>{
    this.setState({messages: nextProps.messages, recipient: nextProps.recipient});
  };

  handleClose = () => {
    this.props.closeModal();
  };

  textChange=(e)=>{
    this.setState({userMessage: e.target.value});
  };

  submitMessage=()=>{

    const message={
      id: this.props.id,
      text: this.state.userMessage,
      user: this.props.email,
      recipient: this.state.recipient
    }

    API.postMessage(message).then((response)=>{
      this.setState({userMessage: ''});
      this.getMessages();
    });

  };

  getMessages=()=>{

    let self = this;
        
    API.getConvoFromListing(this.props.email, this.props.id).then((response)=>{
        self.setState({messages:response.data})
    });

  };

  render() {
    const actions = [
      <TextField
        value={this.state.userMessage}
        onChange={this.textChange.bind(this)}
        hintText="Send a message"
        fullWidth={true}
      />,
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Send"
        disabled={!this.state.userMessage.length}
        primary={true}
        onClick={this.submitMessage}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Homies Chat"
          actions={actions}
          modal={true}
          autoScrollBodyContent={true}
          open={this.props.open}
        >
        <div style={{marginTop: 30}}>
          {this.state.messages.map((message, i)=>{
            return(
              <div 
              key={i}
              style={{marginTop:26}}
              >
                <p>{message.text}</p>  
                <small className="text-muted">{message.user}</small><br/>
                <small className="text-muted">{message.time}</small>   
              </div>
            )
          })}
        </div>

        </Dialog>
      </div>
    );
  }
}