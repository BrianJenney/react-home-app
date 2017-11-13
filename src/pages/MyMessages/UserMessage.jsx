

import React from 'react';
import API from '../../api/helpers.js';
import NavBar from '../../components/NavBar';
import Divider from 'material-ui/Divider';
import ChatBox from './components/ChatBox';
import {List, ListItem} from 'material-ui/List';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as loginActions from '../../actions/login';
import * as logoutActions from '../../actions/logout';

const message = <i className="material-icons">message</i>

class UserMessages extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            open: false,
            picID: '',
            messages:[],
            recipient: '',
            convo: []
        };
    };

    componentDidMount=()=>{
        let self = this;
        API.getMessages(this.props.email).then((response)=>{

            const messages = response.data;

            //only show the user in the message that is not the logged in user
            messages.map((message)=>{
                return(
                    message.participants = message.participants.filter((name)=>{
                        return name !== self.props.email;
                    })
                )
            })

            return self.setState({messages: response.data});
        });
    };

    getConvo=(messages)=>{
        this.setState({convo: messages});
    };

    render(){
        console.log(this.state.messages)
        return(          
            <div>
                <NavBar selectedIndex={3}/>
                <div className="row">
                    <div className="text-center"> 
                        <h1 className="text-center">My Messages</h1>
                    </div>
                    <div className="row">
                    {this.state.messages.map((message, i)=>{
                        return(
                        <div key={i}>
                                <div className="col-md-4">
                                    <List>
                                        <ListItem primaryText={message.participants[0]} 
                                        onClick={this.getConvo.bind(this, message.messages)}
                                        leftIcon={<img src="https://cdn2.iconfinder.com/data/icons/business-and-finance-related-hand-gestures/256/face_female_blank_user_avatar_mannequin-512.png" 
                                            width="25%"
                                            alt=""/>} />
                                    </List>
                                <Divider/>
                                </div>
                            
                        </div>
                        )
                    })}
                    <div className="col-md-8">
                        <ChatBox
                        open={this.state.open}
                        messages={this.state.convo}/>
                    </div>

                    </div>

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
export default connect(mapStateToProps, mapDispatchToProps)(UserMessages);