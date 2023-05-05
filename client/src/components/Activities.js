import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, CardFooter, Button } from "reactstrap";
import { getAllActivities } from "../modules/activityManager";
import AddActivity from "./AddActivity";


export default function Activities() {
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();



    const getActivities = () => {
        getAllActivities().then(activities => setActivities(activities));
    };

    useEffect(() => {
        getActivities();
    }, []);

    return (
        <>
            <Row>
                {
                    activities.map((activity) => {
                        return (
                                <Col className="fluid animal-container" xs="4" key={activity.id}>
                                    <Card className="img-fluid border-1 shadow-sm animal-card" key={activity.id} style={{ height: '100%' }}>
                                        <div className="text-center">
                                            {activity.name}
                                        </div>
                                        <img
                                            width="100%"
                                            className="animal-img img-fluid rounded shadow-lg"
                                            src={activity.imageUrl}
                                        />
                                        <div className="animal-txt text-center">
                                            {activity.description}
                                        </div>
                                        <div className="text-center">
                                            <AddActivity id={activity.id} />
                                        </div>
                                    </Card>
                                </Col>
                        );
                    })
                }
            </Row>
        </>
    )
}

