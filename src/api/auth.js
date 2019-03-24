export const token = () => {
    const myToken = localStorage.getItem("casaToken");
    return myToken === null ? undefined : JSON.parse(myToken);
};
