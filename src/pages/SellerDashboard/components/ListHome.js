import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DashboardItem from '../../../components/DashboardItem';
import API from '../../../api/helpers';
import { withRouter } from 'react-router';
import EditIcon from '../../../img/icon-edit.png';
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

    const ListHomeButton = ({ text, url }) => (
        <>
            <div className="cutoff">
                <img className="edit-icon" alt="edit icon" src={EditIcon} />
            </div>
            <button className="add-listing" onClick={() => history.push(url)}>
                {text}
            </button>
        </>
    );

    return (
        <DashboardItem order={2} title="List Your Home">
            <div
                className="list-home"
                style={{ display: 'flex', alignItems: 'center' }}
            >
                {homes.length ? (
                    <div className="edit-current-home">
                        <div>
                            <img src={homes[0].imgs[0]} alt="list-home-pic" />
                        </div>
                        <div className="list-home-info">
                            <p>{homes[0].address}</p>
                            <ListHomeButton
                                text="Edit Listing"
                                url={`/edit/property/${homes[0]._id}`}
                            />
                        </div>
                    </div>
                ) : (
                    <ListHomeButton text="List Your Home" url="/addproperty" />
                )}
            </div>
        </DashboardItem>
    );
};

export default withRouter(ListHome);
