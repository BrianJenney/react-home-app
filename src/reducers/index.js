import loggedIn from "./userReducer";
<<<<<<< Updated upstream
import mapMarker from "./mapMarkersReducer";
=======
import { reducer as buyerOffers } from "../pages/BuyerOffers/BuyerOffers.ducks";
import { reducer as listings } from "../pages/Listings/Listings.ducks";
>>>>>>> Stashed changes
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    loggedIn,
<<<<<<< Updated upstream
    mapMarker
=======
    buyerOffers,
    listings
>>>>>>> Stashed changes
});
export default rootReducer;
