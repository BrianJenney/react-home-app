import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import NavBar from './BreadcrumbNav';

const withNavBar = (WrappedComponent) => {
    return (props) => (
        <div>
            <WrappedComponent {...props} />
            <NavBar user={props.user} />
        </div>
    );
};

const mapStateToProps = ({ auth }) => ({
    user: auth,
});

export default compose(connect(mapStateToProps), withNavBar);
