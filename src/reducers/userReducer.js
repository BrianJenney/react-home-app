export default (state = {}, action) => {
    switch (action.type) {
        case "LOGIN":
            return Object.assign({}, state, {
                loggedIn: action.isLogged,
                name: action.name,
                id: action.id,
                user: action.user,
                userType: "buyer"
            });
        case "LOGOUT":
            return Object.assign({});
        case "SWITCH_USER_TYPE":
            const { userType } = action;
            return Object.assign({}, state, { userType });
        default:
            return state;
    }
};
