export const login = user => {
    return {
        type: "LOGIN",
        loggedIn: user.isLogged,
        name: user.name,
        id: user.id,
        user
    };
};
