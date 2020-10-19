export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            const { type, ...rest } = action;
            return {
                ...state,
                ...rest,
            };
        case 'LOGOUT':
            return {};
        case 'COMPLETED_WIZARD':
            const { payload } = action;
            const wizardTypeMap = {
                seller: 'sellerWizardCompleted',
                buyer: 'buyerWizardCompleted',
            };
            return {
                ...state,
                [wizardTypeMap[payload]]: true,
            };

        case 'UPDATE_USER':
            const { updatedVals = {} } = action;
            return {
                ...state,
                ...updatedVals,
            };
        default:
            return state;
    }
};
