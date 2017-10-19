
import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

import { withRouter } from 'react-router'

const home = <i className="material-icons">home</i>;
const list = <FontIcon className="material-icons">view_list</FontIcon>;
const search = <i className="material-icons">location_searching</i>;
const signout = <i className="material-icons">highlight_off</i>;


class NavBar extends React.Component{

    select=(page)=>{
        switch(page){
            case 0:
                this.props.history.push('/nav');
                break;
            case 1:
                this.props.history.push('/addproperty');
                break;
            case 2:
                this.props.history.push('/listings');
                break;
            case 3:
                this.props.history.push('/');
                break;
            default: 
                return;
                
        }
        
    };

    render(){
        return(
        <Paper zDepth={1}>
            <BottomNavigation selectedIndex={this.props.selectedIndex}
            style={{marginBottom: '5%'}}>
            <BottomNavigationItem
                label="Nav"
                icon={home}
                onClick={() => this.select(0)}
            />
            <BottomNavigationItem
                label="Post"
                icon={list}
                onClick={() => this.select(1)}
            />
            <BottomNavigationItem
                label="Search"
                icon={search}
                onClick={() => this.select(2)}
            />
            <BottomNavigationItem
                label="LogOut"
                icon={signout}
                onClick={() => this.select(3)}
            />
            </BottomNavigation>
        </Paper>
        )
    }
}

export default withRouter(NavBar);
