export const login = user => {
    console.log(user, "USER");
    return {
        type: "LOGIN",
        loggedIn: true,
        ...user
    };
};
