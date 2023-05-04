import React, { useEffect, useState } from 'react';
import { getSchedulesForCurrentUser } from '../modules/userManager';
import { Table } from 'reactstrap';
import NewSchedule from './NewSchedule';

export default function Schedules() {
    const [schedules, setSchedules] = useState([]);

    const getSchedules = () => {
        getSchedulesForCurrentUser().then(schedules => setSchedules(schedules));
    };

    useEffect(() => {
        getSchedules()
    }, [])

    return (
        <>
            <div className="container-top">
                <h1>
                    Schedules
                </h1>
                <div className="new-button">
                    <NewSchedule />
                </div>
            </div>
            <Table hover>
                <thead>
                    <tr>
                        <th>Schedule Name</th>
                        <th>Day of Visit</th>
                        <th>Day Created</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule) => {
                        return (
                            <tr key={schedule.id} style={{ cursor: 'pointer' }}>
                                <td>{schedule.name}</td>
                                <td>{schedule.day}</td>
                                <td>{schedule.createdDate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    )
}