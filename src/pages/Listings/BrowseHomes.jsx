
import React from 'react';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import API from '../../api/helpers.js';
import NavBar from '../../components/NavBar';
import MessageBox from './modals/Message';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../../actions/login';
import * as logoutActions from '../../actions/logout';

const message = <i className="material-icons">message</i>
const search = <i className="material-icons">search</i>

class BrowseListings extends React.Component{

    constructor(props){
        super(props)
        
        this.state = {
            houses: [],
            open: false,
            picID: '',
            messages:[]
        }

        this.closeModal = this.closeModal.bind(this);
    };

    componentDidMount=()=>{
        API.getpics(this.props.id).then((docs)=>{
            this.setState({houses: docs.data});
        })    
    };

    openModal=(pic)=>{
        let self = this;
        
        API.getConvoFromListing(this.props.email, pic._id).then((response)=>{
            self.setState({messages:response.data})
        });

        self.setState({open: true, picID: pic._id, recipient: pic.userEmail});
    };

    closeModal=()=>{
        this.setState({open: false});
    };
    
    render(){
        if(this.state.houses.length){

        
        return(
            
            <div>
                <NavBar selectedIndex={2}/>
                <div className="col-md-4 col-md-offset-4">
                    <h1 style={{textAlign: 'center'}}>House Listings</h1>
                    {this.state.houses.map((house, i)=>{
                        return(
                            <Card key={i}>
                                <CardMedia
                                overlay={<CardTitle title={'$'  + house.price} subtitle={house.city.toUpperCase() + ", " + house.zip} />}
                                >
                                <img width="50" src={house.imgUrl} alt="house" />
                                </CardMedia>
                                <CardActions>
                                    <RaisedButton
                                    secondary={true}
                                    icon={message}
                                    onClick={this.openModal.bind(this, house)}
                                    style={{color: 'white'}}
                                    />

                                    <RaisedButton
                                    className="text-right"
                                    secondary={true}
                                    icon={search}
                                    style={{color: 'white'}}
                                    />       
                                </CardActions>
                            </Card>
                            
                        )
                    })}
                    <MessageBox 
                    open={this.state.open}
                    id={this.state.picID}
                    email={this.props.email}
                    messages={this.state.messages}
                    recipient={this.state.recipient}
                    closeModal={this.closeModal}/>
                </div>
                
            </div>
        )
        }else{
            return(
                <div className="text-center">
                    <NavBar selectedIndex={2}/>
                    <h2>No Houses Posted Yet!</h2>
                </div>
            )
        }
    };

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
export default connect(mapStateToProps, mapDispatchToProps)(BrowseListings);