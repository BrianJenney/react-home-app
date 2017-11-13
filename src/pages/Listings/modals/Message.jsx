import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import API from '../../../api/helpers.js';

import '../../../styles/messages.css';

export default class DialogModal extends React.Component {

  constructor(props){
    super(props)
    this.state= {
      disabled: false,
      userMessage: '',
      recipient: ''
    };
  };

  componentWillReceiveProps=(nextProps)=>{
    this.setState({recipient: nextProps.recipient});
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
      from: this.props.email,
      to: this.state.recipient
    }

    API.postMessage(message).then((response)=>{
      this.setState({userMessage: ''});
      this.props.closeModal();
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
          open={this.props.open}
        >
        </Dialog>
      </div>
    );
  }
}