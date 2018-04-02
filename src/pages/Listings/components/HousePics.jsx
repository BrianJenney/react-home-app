import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';

import '../../../styles/picbox.css';

class HousePics extends Component {

    constructor(props){
        super(props)
        this.state={
        }
    }

    horizontalScroll=(imgs)=>{
        return(
            imgs.map((img, id)=>{
                return(
                    <div key={id} className="house-img">
                        <img src={img}/>                     
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
                            <p>{pic.address}</p>
                            <div className="horizontal-scroll">                         
                                {this.horizontalScroll(pic.imgs)}
                            </div> 
                        </div>
                    )
                })}
            </div>
        );
  }
}

export default HousePics;