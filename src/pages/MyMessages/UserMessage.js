import React from 'react';
import API from '../../api/helpers.js';
import Divider from 'material-ui/Divider';
import ChatBox from './components/ChatBox';
import TopNav from '../../components/TopNav';
import { List, ListItem } from 'material-ui/List';

class UserMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            picID: '',
            messages: [],
            recipient: '',
            convo: [],
        };
        this.refreshConvo = this.refreshConvo.bind(this);
    }

    componentDidMount = () => {
        let self = this;
        const { user } = this.props;
        API.getMessages(user.email).then((response) => {
            const messages = response.data;
            //only show the user in the message that is not the logged in user
            messages.map((message) => {
                return (message.participants = message.participants.filter(
                    (name) => {
                        return name !== self.props.user.email;
                    }
                ));
            });
            return self.setState({ messages: response.data });
        });
    };

    getConvo = (message) => {
        //set viewed of this message to true
        const { user } = this.props;
        let unviewedMessages = message.messages.filter((item) => {
            return item.to === user.email && !item.viewed;
        });
        //if any message sent to user is not read, set all to read after opening convo
        unviewedMessages.forEach((convo) => {
            API.setMessageToViewed(message._id, convo._id);
        });

        this.setState({
            convo: message.messages,
            recipient: message.participants[0],
            picID: message.id,
        });
    };

    refreshConvo = (recipient, sender) => {
        API.getConvo(recipient, sender).then((response) => {
            this.setState({
                convo: response.data[0].messages,
                recipient,
                picId: response.data[0].id,
            });
        });
    };

    render() {
        return (
            <div>
                <TopNav />
                <div className="row">
                    <div className="text-center">
                        <h1 className="text-center">My Messages</h1>
                    </div>
                    <div className="row">
                        {this.state.messages.map((message, i) => {
                            return (
                                <div key={i}>
                                    <div className="col-md-4">
                                        <List>
                                            <ListItem
                                                primaryText={
                                                    message.participants[0]
                                                }
                                                onClick={this.getConvo.bind(
                                                    this,
                                                    message
                                                )}
                                                leftIcon={
                                                    <img
                                                        src="https://cdn2.iconfinder.com/data/icons/business-and-finance-related-hand-gestures/256/face_female_blank_user_avatar_mannequin-512.png"
                                                        width="25%"
                                                        alt=""
                                                    />
                                                }
                                            />
                                        </List>
                                        <Divider />
                                    </div>
                                </div>
                            );
                        })}
                        <div className="col-md-8">
                            <ChatBox
                                refreshConvo={this.refreshConvo}
                                picID={this.state.picID}
                                recipient={this.state.recipient}
                                sender={this.props.user.email}
                                open={this.state.open}
                                messages={this.state.convo}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserMessages;
