import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { loadState } from './actions/localstorage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const persistedState = loadState() || {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    persistedState,
    /* preloadedState, */ composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
export default store;
