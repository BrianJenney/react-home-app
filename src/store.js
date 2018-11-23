<<<<<<< Updated upstream
=======
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { loadState } from "./actions/localstorage";
import createSagaMiddleware from "redux-saga";
import buyerOffersSaga from "./pages/BuyerOffers/BuyerOffers.sagas";
import listingsSaga from "./pages/Listings/Listings.sagas";
>>>>>>> Stashed changes

import { createStore } from 'redux';
import rootReducer from  './reducers';
import {loadState} from './actions/localstorage';

<<<<<<< Updated upstream
const persistedState = loadState();
=======
    sagaMiddleware.run(listingsSaga);
>>>>>>> Stashed changes

export default(initialState) => {
    return createStore(rootReducer, persistedState);
}