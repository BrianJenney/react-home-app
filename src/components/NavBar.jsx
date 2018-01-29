
import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

import { withRouter } from 'react-router'

import '../styles/nav.css';

const home = <i className="material-icons">home</i>;
const list = <FontIcon className="material-icons">view_list</FontIcon>;
const search = <i className="material-icons">location_searching</i>;
const signout = <i className="material-icons">highlight_off</i>;
const envelope = <i className="material-icons">message</i>


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
            case 4:
                this.props.history.push('/mymessages');
                break;
            default: 
                return; 
        } 
    };

    render(){
        return(
        <Paper zDepth={1}>
            <BottomNavigation className="bottom-nav" selectedIndex={this.props.selectedIndex}>
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
                label="House Hunt"
                icon={search}
                onClick={() => this.select(2)}
            />
            <BottomNavigationItem
                label="Messages"
                icon={envelope}
                onClick={() => this.select(4)}
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
