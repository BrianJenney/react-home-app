import { fork } from "redux-saga/effects";
import buyerOffersSaga from "./pages/BuyerOffers/BuyerOffers.sagas";
import listingsSaga from "./pages/Listings/Listings.sagas";

export default function* rootSaga() {
    yield [
        fork(buyerOffersSaga), // saga1 can also yield [ fork(actionOne), fork(actionTwo) ]
        fork(listingsSaga)
    ];
}
