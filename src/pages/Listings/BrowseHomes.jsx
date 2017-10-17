
import React from 'react';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import API from '../../api/helpers.js';
import NavBar from '../../components/NavBar';
import MessageBox from './modals/Message';


const message = <i className="material-icons">message</i>
const search = <i className="material-icons">search</i>

class BrowseListings extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            houses: [],
            open: false
        }
    };

    componentDidMount=()=>{
        API.getpics().then((docs)=>{
            this.setState({houses: docs.data});
        })    
    };

    openModal=()=>{
        this.setState({open: true});
    };

    listHouses=()=>{
        this.state.houses.map((house, i)=>{
            console.log(house);
            return(       
                <div key={i}>
                    <img src={house.imgUrl} alt=""/>
                    <p>Price</p>
                </div>
            )
        })
    }

    render(){
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
                                    onClick={this.openModal}
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
                    <MessageBox open={this.state.open}/>
                </div>
                
            </div>
        )
    };

}

export default BrowseListings;