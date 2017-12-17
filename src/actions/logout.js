
export const logout = () => {
    localStorage.removeItem('casaToken');
    return {
        type: 'LOGOUT'
    };
  }

