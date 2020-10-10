import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DashboardItem from '../../../components/DashboardItem';

const ProfileWizard = ({ order }) => {
    const [selectedCustomerType, setCustomerType] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const { customerType } = auth;
        setCustomerType(customerType);
    }, [auth]);

    const { customerType = 'premium' } = auth;
    return (
        <DashboardItem order={1} title="Profile Wizard">
            <div style={{ display: 'inline-flex' }}>
                <input type="checkbox" className="d-inline m-2 ml-0" />
                <p>Fill out your profile</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <b style={{ marginRight: '1em' }}>Selected service...</b>
                <SelectField
                    floatingLabelText=""
                    value={selectedCustomerType}
                    onChange={(event, index, val) => setCustomerType(val)}
                    autoWidth={true}
                    floatingLabelStyle={{
                        transform: 'scale(0.75) translate(0px, -28px)',
                        color: '#495057',
                    }}
                >
                    <MenuItem value={'fullserv'} primaryText="full service" />
                    <MenuItem value={'premium'} primaryText="premium" />
                    <MenuItem value={'limited'} primaryText="limited" />
                </SelectField>
            </div>
        </DashboardItem>
    );
};

export default ProfileWizard;
