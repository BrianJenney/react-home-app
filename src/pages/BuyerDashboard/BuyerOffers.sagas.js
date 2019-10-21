import { all, fork, put, takeLatest } from "redux-saga/effects";
import {
    //actions
    GET_OFFERS,
    // action creators
    getOffersSucceeded
} from "./BuyerOffers.ducks";
import API from "../../api/helpers";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getOffers(action) {
    const { userId } = action;
    try {
        const user = yield API.getOffersFromBuyer(userId);
        yield put(getOffersSucceeded(user));
    } catch (e) {
        yield console.log(e);
    }
}

//take latest allows for concurrency - only takes the latest request
//listens for any instance of GET_OFFERS to be called to dispatch the action
const getOffersSaga = function*() {
    yield takeLatest(GET_OFFERS, getOffers);
};

const sagas = function*() {
    yield all([fork(getOffersSaga)]);
};

export default sagas;
export { getOffers, getOffersSaga };
