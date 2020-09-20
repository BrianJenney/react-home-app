export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            const { type, ...rest } = action;
            return Object.assign({}, state, {
                ...rest,
                userType: 'buyer',
            });
        case 'LOGOUT':
            return Object.assign({});
        case 'COMPLETED_WIZARD':
            const { payload } = action;
            const wizardTypeMap = {
                seller: 'sellerWizardCompleted',
                buyer: 'buyerWizardCompleted',
            };
            return Object.assign(state, { [wizardTypeMap[payload]]: true });
        case 'SWITCH_USER_TYPE':
            const { userType } = action;
            return Object.assign({}, state, { userType });
        default:
            return state;
    }
};
