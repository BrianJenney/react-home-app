import Store from '../store';

export const loadState = () => {
    const localState = localStorage.getItem('state');
    try {
        return JSON.parse(localState);
    } catch (ex) {
        return JSON.parse('{}');
    }
};

export const saveState = () => {
    const localState = JSON.stringify(_getStoreState());
    localStorage.setItem('state', localState);
};

const _getStoreState = () => {
    const storeInstance = Store();
    return storeInstance.getState();
};
