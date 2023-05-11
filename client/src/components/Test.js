import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteSchedule, getScheduleById } from "../modules/scheduleManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Table } from "reactstrap";
import EditScheduleForm from "./EditScheduleForm";

const Test = () => {
    const [schedule, setSchedule] = useState({});
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const navigate = useNavigate();
    const { id } = useParams();

    const getSchedules = () => {
        setLoading(true);
        getScheduleById(id).then((schedule) => {
            setSchedule(schedule);
            setLoading(false);
        });
    };

    useEffect(() => {
        getSchedules();
    }, []);

    if (!schedule) {
        return null;
    }

    const handleDelete = () => {
        const confirmBox = window.confirm("Do you really want to delete this schedule?");
        if (confirmBox === true) {
            deleteSchedule(id).then(() => navigate(`/schedules`));
        }
    };

    return (
        <div className="schedule-details-page">
            <div className="banner-image-5">
                <div className="banner-text">
                    <h1>{schedule?.name}</h1>
                </div>
                <img className="banner-bottom" src="https://prod.speakcdn.com/sitefiles/2147/images/texture-transition.png" alt="Decorative texture" />
            </div>
            <div className="details-container">
                {loading ? (
                    <div className="spinner text-center">
                        <Spinner />
                    </div>
                ) : (
                    <div className="row d-flex justify-content-center details-card">
                        <div className="col-md-7">
                            <div className="card p-3 py-4 schedule-details-card">
                                <div className="x-button">
                                    <Button className="back-button" size="sm" outline color="danger" onClick={() => navigate(`/schedules`)}>
                                        x
                                    </Button>
                                </div>

                                <div className="text-center">
                                    <div className="date-container">
                                        Day of Visit:
                                        <div className="schedule-details-date-text">{new Date(schedule?.day).toDateString()}</div>
                                    </div>

                                    <div className="px-4 mt-1">
                                        <p className="fonts">{ }</p>
                                    </div>

                                    <div>
                                        <Table className="chosen-table">
                                            <thead className="table-elements">
                                                <tr>
                                                    {schedule?.chosenAnimals?.length != 0 ? <th>Animals to See</th> : ""}
                                                    {schedule?.chosenActivities?.length != 0 ? <th>Activities to do</th> : ""}
                                                    {schedule?.chosenRestaurants?.length != 0 ? <th>Restaurants to Visit</th> : ""}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    {schedule?.chosenAnimals?.length >= 1 ? (
                                                        <td>
                                                            {schedule.chosenAnimals.map((animal) => {
                                                                return <div className="list-item" key={animal.id}> {animal?.name} </div>;
                                                            })}
                                                        </td>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {schedule?.chosenActivities?.length >= 1 ? (
                                                        <td>
                                                            {schedule.chosenActivities
                                                                .sort((a, b) => new Date(a.time
