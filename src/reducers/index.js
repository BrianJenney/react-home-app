import loggedIn from "./userReducer";
import { reducer as buyerOffers } from "../pages/BuyerOffers/BuyerOffers.ducks";
import { reducer as listings } from "../pages/Listings/Listings.ducks";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    loggedIn,
    buyerOffers,
    listings
});
export default rootReducer;
