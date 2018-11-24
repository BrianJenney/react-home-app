import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { loadState } from "./actions/localstorage";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const persistedState = loadState();

export default initialState => {
    const store = createStore(
        rootReducer,
        persistedState,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);
    return store;
};
