import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getSchedulesForCurrentUser } from '../modules/userManager';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { addActivity } from '../modules/activityManager';

export default function AddActivity({ direction, id }) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownText, setDropdownText] = useState("Schedule");
    const toggle2 = () => setDropdownOpen((prevState) => !prevState);

    const emptyChosenActivity = {
        activityId: id,
        scheduleId: ''
    };

    const [activity, setActivity] = useState(emptyChosenActivity);
    const [schedules, setSchedules] = useState([]);

    const getSchedules = () => {
        getSchedulesForCurrentUser().then(schedules => setSchedules(schedules));
    };

    useEffect(() => {
        getSchedules()
    }, [])

    const handleDropdownText = (evt) => {
        setDropdownText(evt.target.name)
    }

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
        const activityCopy = { ...activity };
        activityCopy[key] = value;
        setActivity(activityCopy);
    };

    const handleSave = (evt) => {
        evt.preventDefault();
        addActivity(activity);
        setDropdownText("Schedule");
        toggle();
    };


    if (schedules.length === 0) {
        return null;
    }

    return (
            <div>
                <Button outline color="success" onClick={toggle}>+</Button>
                <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className="text-center" toggle={toggle}>Which schedule would you like to add this activity to?</ModalHeader>
                    <ModalBody>
                        <div className="p-5 text-center">
                            <Dropdown isOpen={dropdownOpen} toggle={toggle2} direction={direction}>
                                <DropdownToggle caret>{dropdownText}</DropdownToggle>
                                <DropdownMenu>
                                    {schedules.map((schedule) => {
                                        return (
                                            <DropdownItem
                                                key={schedule.id}
                                                id="scheduleId"
                                                value={schedule.id}
                                                name={schedule.name}
                                                onClick={(e) => {
                                                    handleDropdownText(e);
                                                    handleInputChange(e);
                                                }}>
                                                {schedule?.name}
                                            </DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </Dropdown>
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
}


AddActivity.propTypes = {
    direction: PropTypes.string,
}
