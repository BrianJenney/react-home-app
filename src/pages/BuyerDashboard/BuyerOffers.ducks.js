const GET_OFFERS = "BuyerOffers/GET_OFFERS";
const GET_OFFERS_SUCCEEDED = "BuyerOffers/GET_OFFERS_SUCCEEDED";

const initialState = {
    offers: [],
    loading: false
};

// Reducer
const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_OFFERS:
            return {
                ...state,
                loading: true
            };
        case GET_OFFERS_SUCCEEDED:
            return {
                ...state,
                offers: [...action.payload.data],
                loading: false
            };
        default:
            return state;
    }
};

// Action Creators
const getOffers = (userId, homeId) => {
    return { type: GET_OFFERS, userId, homeId };
};

const getOffersSucceeded = payload => {
    return { type: GET_OFFERS_SUCCEEDED, payload };
};

export default reducer;
export {
    // Actions
    GET_OFFERS,
    GET_OFFERS_SUCCEEDED,
    // Action Creators
    getOffers,
    getOffersSucceeded,
    //reducer
    reducer
};
