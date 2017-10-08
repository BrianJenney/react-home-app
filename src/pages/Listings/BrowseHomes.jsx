
import React from 'react';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';

import API from '../../api/helpers.js';

class BrowseListings extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            houses: []
        }
    };

    componentDidMount=()=>{
        API.getpics().then((docs)=>{
            this.setState({houses: docs.data});
        })
        
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
            <div className="col-md-4 col-md-offset-4">
                <h1>House Listings</h1>
                {this.state.houses.map((house, i)=>{
                    return(
                        <Card key={i}>
                            <CardMedia
                            overlay={<CardTitle title={'$'  + house.price} subtitle={house.city.toUpperCase() + ", " + house.zip} />}
                            >
                            <img width="50" src={house.imgUrl} alt="house" />
                            </CardMedia>
                        </Card>
                    )
                })}
            </div>
        )
    };

}

export default BrowseListings;