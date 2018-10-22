export default (state = [], action) => {
    switch (action.type) {
        case "ADD_MARKERS":
            return action.locations;
        case "REMOVE_MARKERS":
            return [];
        default:
            return state;
    }
};
