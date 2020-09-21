import { fork, takeLatest } from 'redux-saga/effects';
import buyerOffersSaga from './pages/BuyerDashboard/BuyerOffers.sagas';
import listingsSaga from './pages/Listings/Listings.sagas';
import store from './store';

function* saveReduxState() {
    //TODO: make this only save user stuff
    const localState = yield store.getState();
    const json = JSON.stringify(localState);
    yield localStorage.setItem('state', json);
}

//take latest allows for concurrency - only takes the latest request
//listens for any instance of GET_OFFERS to be called to dispatch the action
const userSaga = function* () {
    yield takeLatest(
        ['LOGIN', 'LOGOUT', 'COMPLETED_WIZARD', 'SWITCH_USER_TYPE'],
        saveReduxState
    );
};

export default function* rootSaga() {
    yield [fork(buyerOffersSaga), fork(listingsSaga), fork(userSaga)];
}
