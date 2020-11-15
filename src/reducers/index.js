import auth from './userReducer'; //TODO - this should use the ducks style like the others
import { reducer as buyerOffers } from '../pages/BuyerDashboard/BuyerOffers.ducks';
import { reducer as listings } from '../pages/Listings/Listings.ducks';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth,
    buyerOffers,
    listings,
});
export default rootReducer;
