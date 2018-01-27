
import React from 'react';

import API from '../../api/helpers.js';
import NavBar from '../../components/NavBar';
import MessageBox from './modals/Message';
import MapWrapper from './components/MapWrapper';
import UserSearch from './components/Search';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as loginActions from '../../actions/login';
import * as logoutActions from '../../actions/logout';

const message = <i className="material-icons">message</i>

class BrowseListings extends React.Component{

    constructor(props){
        super(props)
        
        this.state = {
            houses: [],
            open: false,
            picID: '',
            messages:[]
        }
    };
    
    render(){ 
        return(
            
            <div>
                <MapWrapper/>
                <UserSearch/>
                <NavBar selectedIndex={2}/>  
            </div>
        )
    };

}

function mapStateToProps(state){
    return {
        id: state.loggedIn.id,
        email: state.loggedIn.name
    };
};

function mapDispatchToProps(dispatch) {
    return {
        loginaction: bindActionCreators(loginActions, dispatch),
        logoutaction: bindActionCreators(logoutActions, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(BrowseListings);