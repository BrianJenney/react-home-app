import React, { component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const AuthContext = React.createContext();

class AuthProvider extends component {
    constructor(props) {
        super(props);
    }

    render() {
        const { userId, userEmail } = this.props;
        return (
            <AuthContext.Provider
                value={{
                    userId,
                    userEmail
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.auth.id,
        userEmail: state.auth.name
    };
}

const AuthConsumer = AuthContext.Consumer;

export default connect(mapStateToProps)(AuthProvider);
export { AuthConsumer };
