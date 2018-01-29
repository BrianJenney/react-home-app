import React, { Component } from 'react';

import API from '../../../api/helpers.js';
import '../../../styles/picbox.css';

class HousePics extends Component {

    constructor(props){
        super(props)
        this.state={
        }
    }

    render() {
        return (
            <div className="house-pics">
                {this.props.pics.map((pic, id)=>{
                    return(
                        <div key={id}>
                            <p>{pic.address}</p>
                            <img src={pic.imgUrl[0]} alt=""/>
                        </div>
                    )
                })}
            </div>
        );
  }
}

export default HousePics;