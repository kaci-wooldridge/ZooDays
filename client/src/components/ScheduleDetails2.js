// import React, { useState, useEffect } from 'react';
// import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner, Table } from 'reactstrap';
// import { useNavigate } from "react-router-dom";
// import { getScheduleById } from "../modules/scheduleManager";

// const DetailsModal = ({ id }) => {
//     const [modal, setModal] = useState(false);
//     const toggle = () => setModal(!modal);

//     const [schedule, setSchedule] = useState({});
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     const getSchedules = () => {
//         setLoading(true);
//         getScheduleById(id)
//             .then((schedule) => {
//                 setSchedule(schedule);
//                 setLoading(false);
//             });
//     }

//     useEffect(() => {
//         getSchedules()
//     }, []);

//     if (!schedule) {
//         return null;
//     }

//     return (
//         <div>
//             <Button color="info" onClick={toggle}>Details</Button>
//             <Modal isOpen={modal} toggle={toggle} scrollable={true}>
//                 <ModalHeader toggle={toggle}>{schedule?.name}</ModalHeader>
//                 <ModalBody>
//                             {loading ? (
//                                 <div className="spinner text-center">
//                                     <Spinner />
//                                 </div>
//                             ) :
//                                 (
                                    

//                                     <div className="row d-flex justify-content-center details-card">
//                                         <div className="col-md-7">
//                                             <div className="card p-3 py-4 schedule-details-card">
//                                                 <div className="x-button">
//                                                     <Button className="back-button" size="sm" outline color="danger" onClick={() => navigate(`/schedules`)}>
//                                                         x
//                                                     </Button>
//                                                 </div>

//                                                 <div className="text-center">
//                                                     <div className="date-container">Day of Visit:
//                                                         <div className="schedule-details-date-text">
//                                                             {new Date(schedule?.day).toDateString()}
//                                                         </div>
//                                                     </div>

//                                                     <div className="px-4 mt-1">
//                                                         <p className="fonts">{ }</p>
//                                                     </div>

//                                                     <div>
//                                                         {
//                                                             schedule?.chosenAnimals?.length != 0
//                                                                 ?
//                                                                 <Table>
//                                                                     <thead>
//                                                                         <tr>
//                                                                             <th>Animals</th>
//                                                                         </tr>
//                                                                     </thead>
//                                                                     <tbody>
//                                                                         {
//                                                                             schedule?.animals?.map((animal) => {
//                                                                                 return (
//                                                                                     <tr key={animal.id}>
//                                                                                         <td className="list-item" key={animal.id}> {animal.animal.name}</td>
//                                                                                     </tr>
//                                                                                 )
//                                                                             })
//                                                                         }
//                                                                     </tbody>

//                                                                 </Table>
//                                                                 :
//                                                                 ""
//                                                         }
//                                                         {
//                                                             schedule?.activities?.length >= 1
//                                                                 ?
//                                                                 <Table>
//                                                                     <thead>
//                                                                         <tr>
//                                                                             <th>Activities</th>
//                                                                         </tr>
//                                                                     </thead>
//                                                                     <tbody>
//                                                                         {
//                                                                             schedule?.activities?.map((activity) => {
//                                                                                 return (
//                                                                                     <tr key={activity.id}>
//                                                                                         <td className="list-item" key={activity.id}> {activity.activity.name}</td>
//                                                                                     </tr>
//                                                                                 )
//                                                                             })
//                                                                         }
//                                                                     </tbody>

//                                                                 </Table>
//                                                                 :
//                                                                 ""
//                                                         }
//                                                         {
//                                                             schedule?.restaurants?.length >= 1
//                                                                 ?
//                                                                 <Table>
//                                                                     <thead>
//                                                                         <tr>
//                                                                             <th>Restaurants</th>
//                                                                         </tr>
//                                                                     </thead>
//                                                                     <tbody>
//                                                                         {
//                                                                             schedule?.restaurants?.map((restaurant) => {
//                                                                                 return (
//                                                                                     <tr key={restaurant.id}>
//                                                                                         <td className="list-item" key={restaurant.id}> {restaurant.restaurant.name}</td>
//                                                                                     </tr>
//                                                                                 )
//                                                                             })
//                                                                         }
//                                                                     </tbody>

//                                                                 </Table>
//                                                                 :
//                                                                 ""
//                                                         }
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 )}
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
//                     <Button color="secondary" onClick={toggle}>Cancel</Button>
//                 </ModalFooter>
//             </Modal>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { getScheduleById } from '../modules/scheduleManager';
import { getChosenAnimalsByScheduleId } from '../modules/animalManager';
import { getChosenActivitiesByScheduleId } from '../modules/activityManager';
import { getChosenRestaurantsByScheduleId } from '../modules/restaurantManager';

const DetailsModal = ({ id }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [schedule, setSchedule] = useState({});
    const [loading, setLoading] = useState(true);
    const [animals, setAnimals] = useState([]);
    const [activities, setActivities] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    const getAnimals = () => {
        getChosenAnimalsByScheduleId(id).then(setAnimals);
    }

    const getActivities = () => {
        getChosenActivitiesByScheduleId(id).then(setActivities);
    }

    const getRestaurants = () => {
        getChosenRestaurantsByScheduleId(id).then(setRestaurants);
    }

    const getSchedules = () => {
        setLoading(true);
        getScheduleById(id)
            .then((schedule) => {
                setSchedule(schedule);
                setLoading(false);
            });
    }

    useEffect(() => {
        getSchedules();
        getAnimals();
        getActivities();
        getRestaurants();
    }, []);

    if (!schedule) {
        return null;
    }

    return (
        <div>
            <Button color="info" onClick={toggle}>Details</Button>
            <Modal isOpen={modal} toggle={toggle} scrollable={true}>
                <ModalHeader toggle={toggle}>{schedule?.name}</ModalHeader>
                <ModalBody>
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
                                        <div className="date-container">Day of Visit:
                                            <div className="schedule-details-date-text">
                                                {new Date(schedule?.day).toDateString()}
                                            </div>
                                        </div>

                                        <div className="px-4 mt-1">
                                            <p className="fonts">{ }</p>
                                        </div>

                                        <div>
                                            {animals?.length !== 0 && (
                                                <Table>
                                                    <thead>
                                                        <tr>
                                                            <th>Animals</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {animals?.map((animal) => (
                                                            <tr key={animal.id}>
                                                                <td className="list-item">{animal.animal.name}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            )}

                                            {activities?.length !== 0 && (
                                                <Table>
                                                    <thead>
                                                        <tr>
                                                            <th>Activities</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {activities?.map((activity) => (
                                                            <tr key={activity.id}>
                                                                <td className="list-item">{activity.activity.name}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            )}

                                            {restaurants?.length !== 0 && (
                                                <Table>
                                                    <thead>
                                                        <tr>
                                                            <th>Restaurants</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {restaurants?.map((restaurant) => (
                                                            <tr key={restaurant.id}>
                                                                <td className="list-item">{restaurant.restaurant.name}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    </ModalBody>
                 <ModalFooter>
                     <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                     <Button color="secondary" onClick={toggle}>Cancel</Button>
                 </ModalFooter>
             </Modal>
        </div>
    );
}


export default DetailsModal;


