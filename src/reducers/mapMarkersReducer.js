
export default(state = [], action) => {
    switch (action.type) {
        case 'ADD_MARKERS':
            return action.locations
        default:
            return state
    }
};