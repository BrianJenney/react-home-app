
import { createStore } from 'redux';
import rootReducer from  './reducers';
import {loadState} from './actions/localstorage';

const persistedState = loadState();


export default(initialState) => {
    return createStore(rootReducer, persistedState);
}