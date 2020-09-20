export const completeWizard = (wizardType) => {
    return {
        type: 'COMPLETED_WIZARD',
        payload: wizardType,
    };
};
