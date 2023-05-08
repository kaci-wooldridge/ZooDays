import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteSchedule, getScheduleById } from "../modules/scheduleManager";
import zoodays1 from "../images/zoodays1.png";
import { Button, Table } from "reactstrap";
import EditScheduleForm from "./EditScheduleForm";

export default function ScheduleDetails() {
    const [schedule, setSchedule] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    const getSchedules = () => {
        getScheduleById(id)
            .then(schedule => setSchedule(schedule));
    }

    useEffect(() => {
        getSchedules()
    }, []);

    if (!schedule) {
        return null;
    }

    const handleDelete = () => {
        const confirmBox = window.confirm(
            "Do you really want to delete this schedule?"
        )
        if (confirmBox === true) {
            deleteSchedule(id)
                .then(() => navigate(`/schedules`))
        }
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7">
                        <div className="card p-3 py-4">

                            <div className="text-center">
                                <img src={zoodays1} width="300" className="rounded-circle" />
                            </div>

                            <div className="text-center mt-3">
                                <h5 className="mt-2 mb-0">{schedule.name}</h5>
                                <span>Day of Visit: {new Date(schedule.day).toDateString()}</span>

                                <div className="px-4 mt-1">
                                    <p className="fonts">{}</p>
                                </div>

                                <div className="chosen-table">
                                    <Table>
                                        <thead>
                                            <tr>
                                                {
                                                    schedule?.chosenAnimals?.length != 0
                                                        ?
                                                        <th>Animals to See</th>
                                                        :
                                                        ""
                                                }
                                                {
                                                    schedule?.chosenActivities?.length != 0
                                                        ?
                                                        <th>Activities to do</th>
                                                        :
                                                        ""
                                                }
                                                {
                                                    schedule?.chosenRestaurants?.length != 0
                                                        ?
                                                        <th>Restaurants to Visit</th>
                                                        :
                                                        ""
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            {
                                                schedule?.chosenAnimals?.length >= 1
                                                    ?
                                                    <td>
                                                        {
                                                            schedule.chosenAnimals.map((animal) => {
                                                                return (<div className="list-item" key={animal.id}> {animal.name} </div>)
                                                            })}
                                                    </td>
                                                    :
                                                    ""
                                            }
                                            {
                                                schedule?.chosenActivities?.length >= 1
                                                    ?
                                                    <td>
                                                        {
                                                            schedule.chosenActivities.map((activity) => {
                                                                return (<div key={activity.id} className="list-item"> {activity.name} </div>)
                                                            })}
                                                    </td>
                                                    :
                                                    ""
                                            }
                                            {
                                                schedule?.chosenRestaurants?.length >= 1
                                                    ?
                                                    <td>
                                                        {
                                                            schedule.chosenRestaurants.map((restaurant) => {
                                                                return (<div key={restaurant.id} className="list-item"> {restaurant.name} </div>)
                                                            })}
                                                    </td>
                                                    :
                                                    ""
                                                }
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="schedule-buttons2">
                                    <EditScheduleForm id={id} setSchedule={setSchedule} />

                                    <Button className="del-button" outline color="danger" onClick={() => handleDelete(`${schedule.id}`)}>
                                        Delete
                                    </Button>
                                </ div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

