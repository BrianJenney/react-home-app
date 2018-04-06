import React, { Component } from 'react';
import API from '../../api/helpers'

class Property extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount=()=>{
        API.getHome(this.props.match.params.id).then((response)=>{
            this.setState({property: response.data[0]});
        });
    }

    render() {
        return(
            <div>
                {this.state && this.state.property &&
                    <img src={this.state.property.imgs[0]} alt=""/>
                }
            </div>
        )
    }
}

export default Property;