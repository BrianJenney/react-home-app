export const login = user => {
    console.log(user);
    return {
        type: "LOGIN",
        loggedIn: true,
        ...user
    };
};
