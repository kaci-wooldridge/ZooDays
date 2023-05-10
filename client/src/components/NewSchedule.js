import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { addSchedule } from '../modules/scheduleManager';
import { getSchedulesForCurrentUser } from '../modules/userManager';

export default function NewSchedule( {setSchedules} ) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const emptySchedule = {
        name: '',
        day: ''
    };

    const [schedule, setSchedule] = useState(emptySchedule);

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
        const scheduleCopy = { ...schedule };
        scheduleCopy[key] = value;
        setSchedule(scheduleCopy);
    };

    const handleSave = (evt) => {
        evt.preventDefault();
        addSchedule(schedule).then(() => getSchedulesForCurrentUser().then((schedules) => setSchedules(schedules)));
        toggle();
    };

    return (
        <>
            <Button color="success" className="new-button" onClick={toggle}>
                New Schedule
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create a New Schedule</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Schedule Name"
                                value={schedule.name}
                                onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="day">Day of your Visit</Label>
                            <Input type="date" name="day" id="day"
                                value={schedule.day}
                                onChange={handleInputChange} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success"
                        onClick={(e) => {handleSave(e);}}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}