
export const loadState=()=>{
    const myState = localStorage.getItem('state');
    return(myState === null ? undefined : JSON.parse(myState));
};

export const saveState=(state)=>{
    const myState = JSON.stringify(state);
    localStorage.setItem('state', myState);
};
