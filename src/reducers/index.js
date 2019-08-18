import auth from "./userReducer";
import { reducer as buyerOffers } from "../pages/BuyerDashboard/BuyerOffers.ducks";
import { reducer as listings } from "../pages/Listings/Listings.ducks";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth,
    buyerOffers,
    listings
});
export default rootReducer;
