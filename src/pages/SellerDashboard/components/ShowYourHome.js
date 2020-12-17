import React, { useState, useEffect } from 'react';
import DashboardItem from '../../../components/DashboardItem';
import '../../../styles/ShowYourHome.css';

const ShowYourHome = ({ houseId }) => {
    return (
        <DashboardItem order={4} title="Show Your Home">
            <div className="listing-docs">
                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <input
                        type="checkbox"
                        checked
                        onChange={() => {}}
                        className="d-inline m-2 ml-0"
                    />
                    <p>
                        You can show your home via the appointment scheduler
                        and/or by input days for open houses.
                    </p>
                </div>

                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <input
                        type="checkbox"
                        checked
                        onChange={() => {}}
                        className="d-inline m-2 ml-0"
                    />
                    <p>
                        Prepare your home for buyer visits. Clean and declutter
                        so buyer can get the best impression possible.
                    </p>
                </div>

                <div style={{ display: 'inline-flex', marginTop: '1.25em' }}>
                    <p>
                        Answer any questions buyers may have about the home in
                        their offer phase. Message will be shown in this section
                        and in the message box floating on the left of the
                        screen
                    </p>
                </div>
            </div>
        </DashboardItem>
    );
};

export default ShowYourHome;
