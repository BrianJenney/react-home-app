export const switchUser = userType => {
    return {
        type: "SWITCH_USER_TYPE",
        userType
    };
};
