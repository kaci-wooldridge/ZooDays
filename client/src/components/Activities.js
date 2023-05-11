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
            <div className="banner-image2">
                <div className="banner-text">
                    <div>Activities</div>
                </div>
                <img className="banner-bottom" src="https://prod.speakcdn.com/sitefiles/2147/images/texture-transition.png" alt="Decorative texture" />
            </div>
            <Row>
                {
                    activities.map((activity) => {
                        return (
                            <Col className="fluid animal-container" xs="4" key={activity.id}>
                                <Card className="img-fluid border-1 animal-card" key={activity.id} style={{ height: '100%' }}>
                                    <div className="text-center card-top">
                                        {activity.name}
                                    </div>
                                    <img
                                        width="100%"
                                        className="activity-img img-fluid shadow-lg"
                                        src={activity.imageUrl}
                                    />
                                    <div className="card-body">
                                        <div className="activity-time text-center">
                                            {new Date(activity.time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                                        </div>
                                        <div className="animal-txt text-center">
                                            {activity.description}
                                        </div>
                                        <div className="add-button text-center">
                                            <AddActivity id={activity.id} />
                                        </div>
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

