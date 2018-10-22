export const addMapMarker = results => {
    return {
        type: "ADD_MARKERS",
        locations: results.data
    };
};

export const removeMapMarkers = () => {
    return {
        type: "REMOVE_MARKERS"
    };
};
