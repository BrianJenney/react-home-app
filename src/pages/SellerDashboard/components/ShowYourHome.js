import React from 'react';
import DashboardItem from '../../../components/DashboardItem';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import times from 'lodash/times';
import CalendarIcon from '../../../img/calendar.png';
import '../../../styles/ShowYourHome.css';

const ShowYourHome = () => {
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

                <div className="calendar-wrapper">
                    {times(5, (idx) => (
                        <DateRangePicker
                            key={idx}
                            initialSettings={{
                                timePicker: true,
                                startDate: moment().startOf('hour').toDate(),
                                endDate: moment()
                                    .startOf('hour')
                                    .add(8, 'hour')
                                    .toDate(),
                                locale: {
                                    format: 'M/DD hh:mm A',
                                },
                            }}
                        >
                            <div style={{ position: 'relative' }}>
                                <input
                                    className="calendar-input"
                                    placeholder="Add"
                                    type="text"
                                />
                                <img
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        margin: '.25em',
                                    }}
                                    alt="calendar"
                                    height="20px"
                                    width="20px"
                                    src={CalendarIcon}
                                />
                            </div>
                        </DateRangePicker>
                    ))}
                </div>

                <div className="calendar-wrapper">
                    {times(5, (idx) => (
                        <DateRangePicker
                            key={idx}
                            initialSettings={{
                                timePicker: true,
                                startDate: moment().startOf('hour').toDate(),
                                endDate: moment()
                                    .startOf('hour')
                                    .add(8, 'hour')
                                    .toDate(),
                                locale: {
                                    format: 'M/DD hh:mm A',
                                },
                            }}
                        >
                            <div style={{ position: 'relative' }} key={idx}>
                                <input
                                    className="calendar-input"
                                    placeholder="Add"
                                    type="text"
                                />
                                <img
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        margin: '.25em',
                                    }}
                                    alt="calendar"
                                    height="20px"
                                    width="20px"
                                    src={CalendarIcon}
                                />
                            </div>
                        </DateRangePicker>
                    ))}
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
