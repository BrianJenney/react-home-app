import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Wizard from '../../components/Wizard/Wizard';
import { withRouter } from 'react-router';
import NavBar from '../../components/BreadcrumbNav';
import API from '../../api/helpers';
import withBackground from '../../components/WithBackground';
import './styles/wizard.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { completeWizard } from '../../actions/completeWizard';

const Quiz = ({ completeWizard }) => {
    const user = useSelector((state) => state.auth);
    const [form, setForm] = useState(new FormData());

    const optionChangeHandlerCallback = (val, modelName) => {
        form.set(modelName, val);
        setForm(form);
    };

    const submitForm = async () => {
        form.set('wizardType', 'seller');
        form.set('userId', user._id);
        try {
            await API.submitWizardInfo(form);
            completeWizard('seller');
        } catch (ex) {
            throw ex;
        }
    };

    const config = [
        {
            text:
                "Would you like Micasa to represent you? This allows you to keep much more of your sale. Select no if you'd prefer to use an existing realtor",
            componentType: 'binaryOption',
            showOptionsValue: false,
            hideOptionsValue: true,
            subComponentType: 'fileUpload',
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
            subTitle: 'Upload contract agreement',
            modelName: 'authorizeToRepresent',
        },
        {
            text: 'Are you the owner of the home?',
            componentType: 'binaryOption',
            showOptionsValue: 'non-owner',
            hideOptionsValue: 'owner',
            subComponentType: 'multiOptions',
            options: [
                {
                    label: 'Yes',
                    value: 'owner',
                },
                {
                    label: 'No',
                    value: 'non-owner',
                },
            ],
            subOptions: [
                {
                    label: 'Power of Attorney',
                    value: 'poa',
                },
                {
                    label: 'trustee',
                    value: 'trustee',
                },
                {
                    label: 'Adminstrator/Conservator',
                    value: 'admin',
                },
                {
                    label: 'Neither',
                    value: 'n/a',
                },
            ],
            subTitle: "I'm the...",
            modelName: 'ownerType',
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
            isLastQuestion: true,
        },
    ];

    return (
        <div>
            <Wizard
                optionChangeHandlerCallback={optionChangeHandlerCallback}
                config={config}
                total={config.length}
                completeWizard={submitForm}
            />
            <NavBar />
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    return {
        completeWizard: bindActionCreators(completeWizard, dispatch),
    };
}
export default withRouter(
    connect(null, mapDispatchToProps)(withBackground(Quiz))
);
