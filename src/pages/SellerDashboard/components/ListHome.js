import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DashboardItem from '../../../components/DashboardItem';
import API from '../../../api/helpers';
import { withRouter } from 'react-router';
import '../../../styles/listHome.css';

const ListHome = ({ history }) => {
    const [homes, setHome] = useState([]);
    const user = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await API.getListingHomes(user.email);
            setHome(data);
        };
        fetchData();
    }, [user]);

    return (
        <DashboardItem order={2} title="List Your Home">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {homes.length ? (
                    <div></div>
                ) : (
                    <button
                        className="add-listing"
                        onClick={() => history.push('/addproperty')}
                    >
                        List your home
                    </button>
                )}
            </div>
        </DashboardItem>
    );
};

export default withRouter(ListHome);
