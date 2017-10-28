

import React from 'react';
import API from '../../api/helpers.js';
import NavBar from '../../components/NavBar';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as loginActions from '../../actions/login';
import * as logoutActions from '../../actions/logout';

class UserMessages extends React.Component{

    constructor(props){
        super(props)
        this.state = ({
            picData: []
        })

        console.log(props);
    };

    componentDidMount=()=>{
        let self = this;
        API.getPicsByUser(this.props.email).then((response)=>{
            console.log(response.data);
            self.getNumberOfMessages(response.data);
            self.state.picData.push(response.data);
        })
    };

    getNumberOfMessages=(listings)=>{
        let self = this;
        listings.map((pic)=>{
            API.getMessagesFromEachUser(pic._id).then((response)=>{
                pic.messageData = response.data;
                //self.state.picData.push(pic);
            })
        })
    };

    render(){
        console.log(this.state);
        return(
            <div>
                <NavBar selectedIndex={3}/>
                <h1 className="text-center">My Messages</h1>
                {this.state.picData.map((pic, i)=>{
                    return(
                        <div key={i}>
                            {pic}
                        </div>
                    )
                })}
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