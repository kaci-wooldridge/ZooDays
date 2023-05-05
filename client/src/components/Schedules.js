import React, { useEffect, useState } from 'react';
import { getSchedulesForCurrentUser } from '../modules/userManager';
import { Table } from 'reactstrap';
import NewSchedule from './NewSchedule';
import { useNavigate } from 'react-router-dom';
import { deleteSchedule } from '../modules/scheduleManager';

export default function Schedules() {
    const [schedules, setSchedules] = useState([]);
    const navigate = useNavigate();

    const getSchedules = () => {
        getSchedulesForCurrentUser().then(schedules => setSchedules(schedules));
    };

    useEffect(() => {
        getSchedules()
    }, [])

    const handleDelete = (id) => {
        const confirmBox = window.confirm(
            "Do you really want to delete this schedule?"
        )
        if (confirmBox === true) {
            deleteSchedule(id)
        }
        getSchedules()
    }

    return (
        <>
            <div className="container-top">
                <h1>
                    Schedules
                </h1>
                <div className="new-button">
                    <NewSchedule setSchedules={setSchedules} />
                </div>
            </div>
            <Table hover>
                <thead>
                    <tr>
                        <th>Schedule Name</th>
                        <th>Day of Visit</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule) => {
                        return (
                            <tr key={schedule.id} style={{ cursor: 'pointer' }}>
                                <td onClick={() => navigate(`/schedules/${schedule.id}`)}>{schedule.name}</td>
                                <td onClick={() => navigate(`/schedules/${schedule.id}`)}>{new Date(schedule.day).toDateString()}</td>
                                <td className="text-end">
                                    {/* <button className="edit-button btn btn-dark btn-sm" onClick={() => handleClick2(`${post.id}`)}>Edit</button> */}
                                    <button className="del-button btn btn-outline-danger btn-sm" onClick={() => handleDelete(`${schedule.id}`)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    )
}