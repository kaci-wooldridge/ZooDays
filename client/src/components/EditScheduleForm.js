import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { editSchedule, getScheduleById } from '../modules/scheduleManager';
import { getSchedulesForCurrentUser } from '../modules/userManager';
import { deleteAnimal, getChosenAnimalsByScheduleId } from '../modules/animalManager';
import { deleteActivity, getChosenActivitiesByScheduleId } from '../modules/activityManager';
import { deleteRestaurant, getChosenRestaurantsByScheduleId } from '../modules/restaurantManager';

export default function EditScheduleForm({ id, setSchedules, setSchedule }) {
    const navigate = useNavigate();
    const [scheduleEdit, setScheduleEdit] = useState({});
    const [modal, setModal] = useState(false);
    const [animals, setAnimals] = useState([]);
    const [activities, setActivities] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const toggle = () => setModal(!modal);

    const getSchedules = () => {
        getScheduleById(id)
            .then((schedule) => {
                const tempDate = (new Date(schedule.day))
                schedule.day = tempDate.getFullYear() + "-" + String(tempDate.getMonth() + 1).padStart(2, '0') + "-" + String(tempDate.getDate()).padStart(2, '0')
                setScheduleEdit(schedule)
            })
    }

    const getAnimals = () => {
        getChosenAnimalsByScheduleId(id).then(setAnimals);
    }

    const getActivities = () => {
        getChosenActivitiesByScheduleId(id).then(setActivities);
    }

    const getRestaurants = () => {
        getChosenRestaurantsByScheduleId(id).then(setRestaurants);
    }

    useEffect(() => {
        getSchedules();
        getAnimals();
        getActivities();
        getRestaurants();
    }, []);

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
        const scheduleCopy = { ...scheduleEdit };
        scheduleCopy[key] = value;
        setScheduleEdit(scheduleCopy);
    };

    const handleSave = (evt) => {
        evt.preventDefault();
        editSchedule(scheduleEdit)
        if (setSchedules) {
            editSchedule(scheduleEdit)
                .then(() => {
                    getSchedulesForCurrentUser().then((schedules) => setSchedules(schedules))
                })
        }
        if (setSchedule) {
            editSchedule(scheduleEdit)
                .then(() => {
                    getScheduleById(id).then((scheduleEdit) => setSchedule(scheduleEdit))
                })
        }
        toggle();
    };

    const handleDeleteAnimal = (evt) => {
        const key = evt.target.id;
        deleteAnimal(key)
            .then(() => {
                getAnimals();
            })
    }

    const handleDeleteActivity = (evt) => {
        const key = evt.target.id;
        deleteActivity(key)
            .then(() => {
                getActivities();
            })
    }

    const handleDeleteRestaurant = (evt) => {
        const key = evt.target.id;
        deleteRestaurant(key)
            .then(() => {
                getRestaurants();
            })
    }

    return (
        <div>
            <Button outline color="dark" onClick={toggle}>Edit</Button>
            <Modal isOpen={modal} toggle={toggle} scrollable={true}>
                <ModalHeader toggle={toggle}>Edit Schedule</ModalHeader>
                <ModalBody>
                    <div className="text-center p-5">
                        <Form>
                            <FormGroup>
                                <Label for="name">Schedule Name</Label>
                                <Input type="text" name="name" id="name" placeholder={scheduleEdit.name}
                                    value={scheduleEdit.name}
                                    onChange={handleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="day">Day of Visit</Label>
                                <Input type="date" name="day" id="day"
                                    value={scheduleEdit.day}
                                    onChange={handleInputChange} />
                            </FormGroup>
                        </Form>
                    </div>
                    {
                        animals?.length >= 1
                            ?
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Animals</th>
                                        <th>   </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        animals?.map((animal) => {
                                            return (
                                                <tr key={animal.id}>
                                                    <td className="list-item" key={animal.id}> {animal.animal.name}</td>
                                                    <td className="schedule-buttons">
                                                        <Button className="btn-sm" outline color="danger"
                                                            style={{ cursor: 'pointer' }}
                                                            id={animal.id}
                                                            onClick={(e) => { handleDeleteAnimal(e); }}>
                                                            x
                                                        </Button>
                                                    </td>
                                                </tr>
                                                    )
                                        })
                                    }
                                </tbody>

                            </Table>
                            :
                            ""
                    }
                    {
                        activities?.length >= 1
                            ?
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Activities</th>
                                        <th>   </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        activities?.map((activity) => {
                                            return (
                                                <tr key={activity.id}>
                                                    <td className="list-item" key={activity.id}> {activity.activity.name}</td>
                                                    <td className="schedule-buttons">
                                                        <Button className="btn-sm" outline color="danger"
                                                            style={{ cursor: 'pointer' }}
                                                            id={activity.id}
                                                            onClick={(e) => { handleDeleteActivity(e); }}>
                                                            x
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </Table>
                            :
                            ""
                    }
                    {
                        restaurants?.length >= 1
                            ?
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Restaurants</th>
                                        <th>   </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        restaurants?.map((restaurant) => {
                                            return (
                                                <tr key={restaurant.id}>
                                                    <td className="list-item" key={restaurant.id}> {restaurant.restaurant.name}</td>
                                                    <td className="schedule-buttons">
                                                        <Button className="btn-sm" outline color="danger"
                                                            style={{ cursor: 'pointer' }}
                                                            id={restaurant.id}
                                                            onClick={(e) => { handleDeleteRestaurant(e); }}>
                                                            x
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </Table>
                            :
                            ""
                    }

                </ModalBody>
                <ModalFooter>
                    <Button color="success"
                        onClick={(e) => { handleSave(e); }}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};