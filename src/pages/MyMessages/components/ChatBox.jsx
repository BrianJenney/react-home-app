import React from 'react';
import {Card, CardActions, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';

import API from '../../../api/helpers.js';

import '../../../styles/global.css';
import '../../../styles/messages.css';


const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};


export default class ChatBox extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            open: false,
            userMessage: '',
            messages: []
        }     
    }

    componentDidMount=()=>{
        const objDiv = document.querySelector(".scrollable-box");
        objDiv.scrollTop = objDiv.scrollHeight;
    };

    componentWillReceiveProps=(props)=>{
        this.setState({messages: props.messages});
    };

    textChange=(e)=>{
        this.setState({userMessage: e.target.value});
    };

    submitMessage=()=>{

        const message={
            id: this.props.picID,
            text: this.state.userMessage,
            from: this.props.sender,
            to: this.props.recipient
        }

        API.postMessage(message).then((response)=>{
            this.setState({userMessage: ''});
        }).then(()=>{
            this.props.refreshConvo(message.to, message.from);
        })
    };

    render(){
        return(
            <div style={{display: this.state.messages.length ? 'block' : 'none'}}>
                <Card>
                    <CardText className="scrollable-box">
                    {this.state.messages.map((chat, i)=>{
                        return(

                            <Chip 
                            className={chat.from === this.props.recipient ? 'receiver' : ''}
                            style={styles.chip} 
                            key={i}>
                            <p className={chat.from === this.props.recipient ? 'white-text' : ''}>{chat.text}</p>
                            </Chip>
                        )
                    })}
                    </CardText>
                    
                    <div style={{margin: 'auto', width: '95%'}}>
                        <TextField
                        value={this.state.userMessage}
                        onChange={this.textChange.bind(this)}
                        fullWidth ={true}
                        floatingLabelText="Your message"
                        />
                    </div>
                    
                    <CardActions>
                        <FlatButton label="Send" 
                        primary={true}
                        onClick={this.submitMessage}
                        disabled={!this.state.userMessage.length || !this.props.messages.length}/>
                        <FlatButton label="Cancel" />
                    </CardActions>
                </Card>     
            </div>
        )
    }

}