import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DashboardItem from '../../../components/DashboardItem';
import API from '../../../api/helpers';

const ProfileWizard = () => {
    const [selectedCustomerType, setCustomerType] = useState(null);
    const user = useSelector((state) => state.auth);
    const { customerType } = user;
    const dispatch = useDispatch();

    useEffect(() => {
        setCustomerType(customerType);
    }, [user]);

    const updateProfile = async (selectedService) => {
        const updatedUser = { ...user, customerType: selectedService };
        try {
            await API.updateProfile(updatedUser);
            setCustomerType(selectedService);
            dispatch({
                type: 'UPDATE_USER',
                updatedVals: { customerType: selectedService },
            });
        } catch (ex) {
            throw ex;
        }
    };

    const options = [
        { val: 'fullserv', name: 'Full Service' },
        { val: 'premium', name: 'Premium' },
        { val: 'limited', name: 'Limited' },
    ];

    return (
        <DashboardItem order={1} title="Profile Wizard">
            <div style={{ display: 'inline-flex' }}>
                <input type="checkbox" checked className="d-inline m-2 ml-0" />
                <p>Fill out your profile</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <b style={{ marginRight: '1em' }}>Selected service...</b>
                <SelectField
                    floatingLabelText=""
                    value={selectedCustomerType}
                    onChange={(event, index, val) => updateProfile(val)}
                    autoWidth={true}
                    floatingLabelStyle={{
                        transform: 'scale(0.75) translate(0px, -28px)',
                        color: '#495057',
                    }}
                >
                    {options.map(({ name, val }) => (
                        <MenuItem key={val} value={val} primaryText={name} />
                    ))}
                </SelectField>
            </div>
        </DashboardItem>
    );
};

export default ProfileWizard;
