import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { editSchedule, getScheduleById } from '../modules/scheduleManager';
import { getSchedulesForCurrentUser } from '../modules/userManager';

export default function EditScheduleForm({ id, setSchedules, setSchedule }) {
    const navigate = useNavigate();
    const [scheduleEdit, setScheduleEdit] = useState({});
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const getSchedules = () => {
        getScheduleById(id).then(setScheduleEdit)
    }

    useEffect(() => {
        getSchedules()
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

    return (
        <div>
            <Button outline color="dark" onClick={toggle}>Edit</Button>
            <Modal isOpen={modal} toggle={toggle}>
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