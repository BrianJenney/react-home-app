import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";

import API from "../../api/helpers.js";

import "../../styles/messages.css";

export default class DialogModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            userMessage: "",
            recipientEmail: null,
            senderEmail: null,
            propertyId: null
        };
    }

    componentWillReceiveProps = nextProps => {
        this.setState({
            recipientEmail: nextProps.user.email,
            senderEmail: nextProps.senderEmail
        });
    };

    handleClose = () => {
        this.props.closeModal();
    };

    textChange = e => {
        this.setState({ userMessage: e.target.value });
    };

    submitMessage = () => {
        const message = {
            text: this.state.userMessage,
            from: this.props.senderEmail,
            to: this.state.recipientEmail
        };

        API.postMessage(message).then(response => {
            this.setState({ userMessage: "" });
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
            />
        ];

        return (
            <div>
                <Dialog actions={actions} modal={true} open={this.props.open} />
            </div>
        );
    }
}
