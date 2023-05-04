import React, { useEffect, useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { getSchedulesForCurrentUser } from '../modules/userManager';

export default function ScheduleDropdown({ direction }) {
    const [schedules, setSchedules] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownText, setDropdownText] = useState("Schedule");

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const getSchedules = () => {
        getSchedulesForCurrentUser().then(schedules => setSchedules(schedules));
    };

    useEffect(() => {
        getSchedules()
    }, [])

    const handleDropdownText = (evt) => {
        setDropdownText(evt.target.name)
    }

    return (
        <>
        <div className="d-flex p-5">
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                    <DropdownToggle caret>{dropdownText}</DropdownToggle>
                    <DropdownMenu>
                        {schedules.map((schedule) => {
                            return (
                                <DropdownItem
                                    key={schedule.id}
                                    name={schedule.name}
                                    onClick={(e) => {
                                        handleDropdownText(e);
                                    }}>{schedule?.name}</DropdownItem>
                            )
                        })}
                </DropdownMenu>
            </Dropdown>
            </div>
        </>
    );
}

ScheduleDropdown.propTypes = {
    direction: PropTypes.string,
};