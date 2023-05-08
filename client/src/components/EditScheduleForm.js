import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { editSchedule, getScheduleById } from '../modules/scheduleManager';
import { getSchedulesForCurrentUser } from '../modules/userManager';
import { deleteAnimal, getChosenAnimalsByScheduleId } from '../modules/animalManager';

export default function EditScheduleForm({ id, setSchedules, setSchedule }) {
    const navigate = useNavigate();
    const [scheduleEdit, setScheduleEdit] = useState({});
    const [modal, setModal] = useState(false);
    const [animals, setAnimals] = useState([]);
    const [activities, setActivities] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const toggle = () => setModal(!modal);

    const getSchedules = () => {
        getScheduleById(id).then(setScheduleEdit)
    }

    const getAnimals = () => {
        getChosenAnimalsByScheduleId(id).then(setAnimals);
    }

    useEffect(() => {
        getSchedules();
        getAnimals();
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
            getSchedulesForCurrentUser().then((schedules) => setSchedules(schedules))
        }
        if (setSchedule) {
            getScheduleById(id).then((scheduleEdit) => setSchedule(scheduleEdit))
        }
        toggle();
    };

    const handleDeleteAnimal = (evt) => {
        evt.preventDefault();
        const key = evt.target.id;
        deleteAnimal(key).then(getChosenAnimalsByScheduleId(id).then(setAnimals));
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
                        scheduleEdit?.chosenActivities?.length >= 1
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
                                        scheduleEdit?.chosenActivities.map((activity) => {
                                            return (
                                                <tr key={activity.id} style={{ cursor: 'pointer' }}>
                                                    <td className="list-item" key={activity.id}> {activity.name}</td>
                                                    <td className="schedule-buttons">
                                                        <Button className="btn-sm" outline color="danger">x</Button>
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
                        scheduleEdit?.chosenRestaurants?.length >= 1
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
                                        scheduleEdit?.chosenRestaurants.map((restaurant) => {
                                            return (
                                                <tr key={restaurant.id} style={{ cursor: 'pointer' }}>
                                                    <td className="list-item" key={restaurant.id}> {restaurant.name}</td>
                                                    <td className="schedule-buttons">
                                                        <Button className="btn-sm" outline color="danger">x</Button>
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