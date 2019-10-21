export const login = user => {
    return {
        type: "LOGIN",
        loggedIn: true,
        ...user
    };
};
