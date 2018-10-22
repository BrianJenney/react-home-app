import loggedIn from "./userReducer";
import mapMarker from "./mapMarkersReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    loggedIn,
    mapMarker
});
export default rootReducer;
