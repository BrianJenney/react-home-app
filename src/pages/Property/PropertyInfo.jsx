import React, { Component } from 'react';
import NavBar from '../../components/NavBar';
import API from '../../api/helpers'

class Property extends Component {

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
                <NavBar selectedIndex={1}/>
            </div>
        )
    }
}

export default Property;