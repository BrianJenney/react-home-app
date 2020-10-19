export const logout = () => {
    localStorage.removeItem('casaToken');
    localStorage.removeItem('state');
    return {
        type: 'LOGOUT',
    };
};
