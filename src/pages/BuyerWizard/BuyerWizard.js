import React, { useState } from 'react';
import { withRouter } from 'react-router';
import withBackground from '../../components/WithBackground';
import Wizard from '../../components/Wizard/Wizard';
import './styles/BuyerWizard.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { completeWizard } from '../../actions/completeWizard';

const BuyerWizard = ({ user, history, completeWizard }) => {
    const [form, setForm] = useState(new FormData());

    const optionChangeHandlerCallback = (val, modelName) => {
        form.append(modelName, val);
        setForm(form);
    };

    const config = [
        {
            text: 'When are you planning to buy?',
            componentType: 'multiOptions',
            showOptionsValue: false,
            hideOptionsValue: false,
            subComponentType: null,
            subOptions: [
                {
                    label: 'ASAP',
                    value: 'asap',
                },
                {
                    label: '3-6 mo',
                    value: '3|6|month',
                },
                {
                    label: '6-12 mo',
                    value: '6|12|month',
                },
                {
                    label: '1-3 yrs',
                    value: '1|3|year',
                },
                {
                    label: 'Not Sure',
                    value: 'unsure',
                },
            ],
            subTitle: null,
            modelName: 'timelineToBuy',
        },
        {
            text: `You don't need an agent with Micasa which cuts out pricey closing fees. But we have to check... do you have a real estate agent?`,
            componentType: 'binaryOption',
            showOptionsValue: false,
            hideOptionsValue: false,
            subComponentType: null,
            options: [
                {
                    label: 'Yes',
                    value: true,
                },
                {
                    label: 'No',
                    value: false,
                },
            ],
            subOptions: [],
            subTitle: null,
            getNextPage: (val) => (val ? 2 : 1),
            modelName: 'hasAgent', //TODO: might not need this since they cannot proceed if using an agent....
        },
        {
            text: 'What is the full name of ownership?',
            componentType: 'freeText',
            options: [],
            subTitle: '',
            modelName: 'ownershipName',
        },
        {
            text: 'Have you ever sold a home?',
            componentType: 'binaryOption',
            showOptionsValue: 'hasSoldBefore',
            hideOptionsValue: 'n/a',
            subComponentType: 'multiOptions',
            options: [
                {
                    label: 'Yes',
                    value: 'hasSoldBefore',
                },
                {
                    label: 'No',
                    value: 'n/a',
                },
            ],
            subOptions: [
                {
                    label: 'Realtor',
                    value: 'realtor',
                },
                {
                    label: 'Attorney',
                    value: 'attorney',
                },
                {
                    label: 'Sold it myself',
                    value: 'independent',
                },
                {
                    label: 'Other',
                    value: 'other',
                },
            ],
            subTitle: 'Via which method?',
            modelName: 'previousSellingMethod',
        },
        {
            text:
                'Do you, a relative, or one of the owners of the property hold an active California Real Estate License?',
            componentType: 'binaryOption',
            showOptionsValue: false,
            hideOptionsValue: true,
            options: [
                {
                    label: 'Yes',
                    value: true,
                },
                {
                    label: 'No',
                    value: false,
                },
            ],
            subOptions: [],
            modelName: 'isRelativeAgent',
        },
        {
            text: 'Ideally how soon do you want the property sold?',
            componentType: 'binaryOption',
            options: [
                {
                    label: 'ASAP',
                    value: 'asap',
                },
                {
                    label: '3 Months',
                    value: '3mos',
                },
                {
                    label: '6 Months',
                    value: '6mos',
                },
            ],
            subOptions: [],
            modelName: 'idealTimeframe',
        },
    ];

    return (
        <div>
            <Wizard
                optionChangeHandlerCallback={optionChangeHandlerCallback}
                config={config}
                total={10}
                completeWizard={(form) => console.log(form)}
            />
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    return {
        completeWizard: bindActionCreators(completeWizard, dispatch),
    };
}
export default withRouter(
    connect(null, mapDispatchToProps)(withBackground(BuyerWizard))
);
