const ADD_MARKERS = 'listings/ADD_MARKERS';
const REMOVE_MARKERS = 'listings/REMOVE_MARKERS';
const ADD_MARKERS_SUCCEEDED = 'listings/ADD_MARKERS_SUCCEEDED';

const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD_MARKERS:
            return state;
        case ADD_MARKERS_SUCCEEDED:
            return [...action.payload.data];
        case REMOVE_MARKERS:
            return [];
        default:
            return state;
    }
};

const addMapMarker = (searchObj) => {
    return { type: ADD_MARKERS, searchObj };
};

const addMapMarkerSucceeded = (payload) => {
    return {
        type: ADD_MARKERS_SUCCEEDED,
        payload,
    };
};

const removeMapMarkers = () => {
    return {
        type: REMOVE_MARKERS,
    };
};

export default reducer;
export {
    ADD_MARKERS,
    REMOVE_MARKERS,
    ADD_MARKERS_SUCCEEDED,
    addMapMarker,
    addMapMarkerSucceeded,
    removeMapMarkers,
    reducer,
};
