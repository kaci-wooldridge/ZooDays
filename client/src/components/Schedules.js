import React, { useEffect, useState } from 'react';
import { getSchedulesForCurrentUser } from '../modules/userManager';
import { Button, Table } from 'reactstrap';
import NewSchedule from './NewSchedule';
import { useNavigate } from 'react-router-dom';
import { deleteSchedule } from '../modules/scheduleManager';
import EditScheduleForm from './EditScheduleForm';

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
                .then(() => {
                    getSchedules()
            })
        }
    }

    return (
        <div className="schedules-container">
            <div className="banner-image-4">
                <div className="banner-text">
                    <h1>Plan Your Visit</h1>
                </div>
                <img className="banner-bottom" src="https://prod.speakcdn.com/sitefiles/2147/images/texture-transition.png" alt="Decorative texture" />
            </div>
            <div className="new-button">
                <NewSchedule setSchedules={setSchedules} />
            </div>

            {
                schedules.length === 0 ? (
                    <div className="no-schedules-message">""</div>
                ) : (
                    <div className="schedule-table">
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Schedule Name</th>
                                    <th>Day of Visit</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedules.sort((a, b) => new Date(a.day) - new Date(b.day)).map((schedule) => {
                                    return (
                                        <tr key={schedule.id} style={{ cursor: 'pointer' }}>
                                            <td onClick={() => navigate(`/schedules/${schedule.id}`)}>
                                                {schedule.name}
                                            </td>
                                            <td onClick={() => navigate(`/schedules/${schedule.id}`)}>
                                                {new Date(schedule.day).toDateString()}
                                            </td>
                                            <td className="text-end">
                                                <div className="schedule-buttons">
                                                    <EditScheduleForm id={schedule.id} setSchedules={setSchedules} />
                                                    <Button className="del-button" outline color="danger" onClick={() => handleDelete(`${schedule.id}`)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                )
            }

            {/* <div className="schedule-table">
            <Table hover>
                <thead>
                    <tr>
                        <th>Schedule Name</th>
                        <th>Day of Visit</th>
                        <th> </th>
                    </tr>
                </thead>
                    <tbody>
                        {schedules.sort((a, b) => new Date(a.day) - new Date(b.day)).map((schedule) => {
                            return (
                                <tr key={schedule.id} style={{ cursor: 'pointer' }}>
                                    <td onClick={() => navigate(`/schedules/${schedule.id}`)}>
                                        {schedule.name}
                                    </td>
                                    <td onClick={() => navigate(`/schedules/${schedule.id}`)}>
                                        {new Date(schedule.day).toDateString()}
                                    </td>
                                    <td className="text-end">
                                        <div className="schedule-buttons">
                                            <EditScheduleForm id={schedule.id} setSchedules={setSchedules} />

                                            <Button className="del-button" outline color="danger" onClick={() => handleDelete(`${schedule.id}`)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
                </Table>
            </div> */}
        </div>
    )
}