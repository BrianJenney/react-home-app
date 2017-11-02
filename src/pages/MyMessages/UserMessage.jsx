

import React from 'react';
import API from '../../api/helpers.js';
import NavBar from '../../components/NavBar';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as loginActions from '../../actions/login';
import * as logoutActions from '../../actions/logout';

const message = <i className="material-icons">message</i>

class UserMessages extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            picData: []
        }
    };

    componentDidMount=()=>{
        let self = this;
        const picsRequest = API.getPicsByUser(this.props.email).then((response)=>{
            return response.data;
        });

        let picData = [];
        
        Promise.all([picsRequest]).then((resp)=>{
            const data = resp[0];
            data.map((pic)=>{
                console.log(pic._id);
                API.getMessagesFromEachUser(pic._id).then((response)=>{
                    pic.messageData = response.data;
                    picData.push(pic);
                }).then(()=>{
                    console.log(picData);
                    self.setState({picData: picData});
                })
            });
        });
    };

    render(){
        return(          
            <div>
                <NavBar selectedIndex={3}/>
                    <div className="col-md-4 col-md-offset-4"> 
                    <h1 className="text-center">My Messages</h1>
                    {this.state.picData.map((pic, i)=>{
                        return(
                            <Card key={i}>
                            <CardMedia
                            overlay={<CardTitle title={'$'  + pic.price} subtitle={pic.city.toUpperCase() + ", " + pic.zip} />}
                            >
                            <img width="50" src={pic.imgUrl} alt="house" />
                            </CardMedia>
                            <CardActions>
                                {pic.messageData.map((msg, idx)=>{
                                    return(
                                        <RaisedButton
                                        key={idx}
                                        secondary={true}
                                        icon={message}
                                        label={msg._id}
                                        style={{color: 'white'}}
                                        />
                                    )
                                })}
                                

                            </CardActions>
                        </Card>
                        )
                    })}
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