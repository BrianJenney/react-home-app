import { fork } from "redux-saga/effects";
import buyerOffersSaga from "./pages/BuyerOffers/BuyerOffers.sagas";
import listingsSaga from "./pages/Listings/Listings.sagas";

export default function* rootSaga() {
    yield [fork(buyerOffersSaga), fork(listingsSaga)];
}
