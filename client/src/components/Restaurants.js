import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "reactstrap";
import { getAllRestaurants } from "../modules/restaurantManager";
import AddRestaurant from "./AddRestaurant";


export default function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();



    const getRestaurants = () => {
        getAllRestaurants().then(restaurants => setRestaurants(restaurants));
    };

    useEffect(() => {
        getRestaurants();
    }, []);

    return (
        <>
            <Row>
                {
                    restaurants.map((restaurant) => {
                        return (
                            <Col key={restaurant.id} className="fluid animal-container" xs="4">
                                <Card className="img-fluid border-1 shadow-sm animal-card" style={{ height: '100%' }}>
                                    <div className="text-center" >
                                        {restaurant.name}
                                    </div>
                                    <img
                                        width="100%"
                                        className="animal-img img-fluid rounded shadow-lg"
                                        src={restaurant.imageUrl}
                                    />
                                    <div className="animal-txt text-center">
                                        {restaurant.cost}
                                    </div>
                                    <div className="text-center">
                                        <AddRestaurant id={restaurant.id} />
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