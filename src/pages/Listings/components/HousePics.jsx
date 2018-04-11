import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import '../../../styles/picbox.css';

class HousePics extends Component {

    constructor(props){
        super(props)
    }

    horizontalScroll=(imgs, picId)=>{
        return(
            imgs.map((img, idx)=>{
                return(
                    <div className="property-pic" key={idx}>
                        <Link to={`/property/${picId}`}>
                            <img src={img}/>
                        </Link>
                    </div>  
                )
            })
        )
    }

    render() {
        return (
            <div className="house-pics">
                {this.props.pics.map((pic, id)=>{
                    return(
                        <div key={id}>
                            <div className="horizontal-scroll">
                                {this.horizontalScroll(pic.imgs, pic._id)}
                            </div>
                            <div className="property-info">
                                <p>{pic.address}, {pic.city} {pic.zipCode}</p>
                                <span>Price: $ {pic.price}</span>
                                <span>Rooms: {pic.bedRooms}</span>
                                <span>Bath: {pic.bathRooms}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default HousePics;