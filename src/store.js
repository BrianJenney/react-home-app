import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { loadState } from "./actions/localstorage";
import createSagaMiddleware from "redux-saga";
import buyerOffersSaga from "./pages/BuyerOffers/BuyerOffers.sagas";

const sagaMiddleware = createSagaMiddleware();
const persistedState = loadState();

export default initialState => {
    const store = createStore(
        rootReducer,
        persistedState,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(buyerOffersSaga);

    return store;
};
