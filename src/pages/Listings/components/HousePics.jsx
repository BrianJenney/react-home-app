import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import '../../../styles/picbox.css';

const markerIcon = <i className="material-icons">room</i>;

const imgStyle = {
    padding: '0.10em'
}

const EachHmStyle = {
    paddingTop: '0.5em',
    borderBottom: '1px solid #ced4da'
}

const HousePicStyle = {
    paddingBottom: '3rem'
}

class HousePics extends Component {

    horizontalScroll=(imgs, picId)=>{
        return(
            imgs.map((img, idx)=>{
                return(
                    <div className="property-pic" key={idx}>
                        <Link to={`/property/${picId}`}>
                            <img src={img} alt={picId} style={imgStyle}/>
                        </Link>
                    </div>  
                )
            })
        )
    }

    render() {
        return (
            <div className="house-pics" style={HousePicStyle}>
                {this.props.pics.map((pic, id)=>{
                    return(
                        <div key={id} style={EachHmStyle}>
                            <div className="horizontal-scroll">
                                {this.horizontalScroll(pic.imgs, pic._id)}
                            </div>
                            <div className="property-info">
                                <p>
                                    <span className="house-price">
                                    {markerIcon} ${pic.price}
                                    </span>
                                    <span className="house-address">
                                    {pic.address}, {pic.city} {pic.zipCode}
                                    </span>
                                </p>
                                <p>
                                    <span className="house-beds">{pic.bedRooms} Beds</span>
                                    <span className="house-baths">{pic.bathRooms} Baths</span>
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default HousePics;