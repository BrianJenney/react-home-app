import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import withBackground from '../../components/WithBackground';
import Wizard from '../../components/Wizard/Wizard';
import API from '../../api/helpers';
import './styles/BuyerWizard.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { completeWizard } from '../../actions/completeWizard';

const BuyerWizard = () => {
    const user = useSelector((state) => state.auth);
    const [form, setForm] = useState(new FormData());

    const optionChangeHandlerCallback = (val, modelName) => {
        form.append(modelName, val);
        setForm(form);
    };

    const submitForm = async () => {
        debugger;
        form.set('wizardType', 'buyer');
        form.set('userId', user._id);
        try {
            await API.submitWizardInfo(form);
            completeWizard('buyer');
        } catch (ex) {
            throw ex;
        }
    };

    const config = [
        //0
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
        //1
        {
            text: `You don't need an agent with Micasa which cuts out pricey closing fees. But we have to check... do you have a real estate agent?`,
            componentType: 'binaryOption',
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
            getNextPage: (val) => (val ? 2 : 4),
            modelName: 'hasAgent', //TODO: might not need this since they cannot proceed if using an agent....
        },
        //2
        {
            text: 'Would you rather do this without an agent?',
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
            getNextPage: (val) => (val ? 4 : 3),
        },
        //3
        {
            text: `We're not able to help you`,
            componentType: 'binaryOption',
            showOptionsValue: false,
            hideOptionsValue: false,
            subComponentType: null,
            options: [],
            subOptions: [],
            subTitle: null,
        },
        //4
        {
            text:
                'Based on your needs, either of these options match well with you. Which would you prefer?',
            componentType: 'optionsWithDivider',
            showOptionsValue: false,
            hideOptionsValue: false,
            subComponentType: null,
            options: [
                {
                    label: 'This One',
                    value: 'micasaAgent',
                    html: `<div style="text-align:initial">
                            <h3>Micasa's Buyer Agents</h3>
                            <p>Features a...</p>
                            <ul>
                                <li>1% Commission</li>
                                <li>Dashboard that guides progress</li>
                                <li>Our consultation</li>
                            </ul>
                        </div>`,
                },
                {
                    label: 'This One',
                    value: 'traditionalAgent',
                    html: `<div style="text-align:initial">
                            <h3>Traditional Service</h3>
                            <p>Features a...</p>
                            <ul>
                                <li>3% Commission</li>
                                <li>A partner real estate agent</li>
                            </ul>
                        </div>`,
                },
            ],
            subOptions: [],
            subTitle: null,
            modelName: 'repAgent',
        },
        //5
        {
            text:
                'Do you need to sell your property before you can purchase another',
            componentType: 'binaryOption',
            showOptionsValue: true,
            hideOptionsValue: false,
            subComponentType: 'multiOptions',
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
            subOptions: [
                {
                    label: 'Yes',
                    value: true,
                },
                {
                    label: 'No',
                    value: false,
                },
            ],
            subTitle: 'Would you you like us to help you sell your home',
            modelName: 'assistanceWithCurrentHomeSale',
            isLastQuestion: true,
        },
    ];

    return (
        <div>
            <Wizard
                optionChangeHandlerCallback={optionChangeHandlerCallback}
                config={config}
                total={5}
                completeWizard={submitForm}
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
