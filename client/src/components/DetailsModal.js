import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getScheduleById } from "../modules/scheduleManager";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Table } from "reactstrap";

export default function DetailsModal({ id }) {
    const [schedule, setSchedule] = useState({});
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    const toggleModal = () => setModal(!modal);

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

    return (
        <div className="details-container">
            <Button outline color="primary" onClick={toggleModal} className="details-button">
                Details
            </Button>
            <Modal isOpen={modal} toggle={toggleModal} size="xl">
                <ModalHeader toggle={toggleModal}>Schedule Details</ModalHeader>
                <ModalBody>
                    {loading ? (
                        <div className="spinner text-center">
                            <Spinner />
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="date-container">
                                Day of Visit:
                                <div className="schedule-details-date-text">
                                    {new Date(schedule?.day).toDateString()}
                                </div>
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
                                                        return (
                                                            <div className="list-item" key={animal.id}>
                                                                {animal?.name}
                                                            </div>
                                                        );
                                                    })}
                                                </td>
                                            ) : (
                                                ""
                                                )}
                                                {
                                                    schedule?.chosenActivities?.length >= 1
                                                        ?
                                                        <td>
                                                            {
                                                                schedule.chosenActivities
                                                                    .sort((a, b) => new Date(a.time) - new Date(b.time))
                                                                    .map((activity) => {
                                                                        return (
                                                                            <>
                                                                                <div key={activity.id}
                                                                                    className="list-item schedule-details-activity-name"
                                                                                >
                                                                                    {activity?.name} - {new Date(activity.time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                                                                                </div>
                                                                                {/* <div className="time-hidden">
                                                                                            {new Date(activity.time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                                                                                        </div> */}
                                                                            </>
                                                                        )
                                                                    })
                                                            }
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
                                                                    return (<div key={restaurant.id} className="list-item"> {restaurant?.name} </div>)
                                                                })}
                                                        </td>
                                                        :
                                                        ""
                                                }
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    )}
                </ModalBody>
            </Modal>
        </div>
    );
}
