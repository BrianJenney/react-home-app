import loggedIn from "./userReducer";
import mapMarker from "./mapMarkersReducer";
import { reducer as buyerOffers } from "../pages/BuyerOffers/BuyerOffers.ducks";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    loggedIn,
    mapMarker,
    buyerOffers
});
export default rootReducer;
