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
            <div className="banner-image3">
                <div className="banner-text">
                    <h1>Restaurants</h1>
                </div>
                <img className="banner-bottom" src="https://prod.speakcdn.com/sitefiles/2147/images/texture-transition.png" alt="Decorative texture" />
            </div>
            <Row>
                {
                    restaurants.map((restaurant) => {
                        return (
                            <Col key={restaurant.id} className="fluid animal-container" xs="4">
                                <Card className="img-fluid border-1 shadow-sm animal-card" style={{ height: '100%' }}>
                                    <div className="text-center card-top" >
                                        {restaurant.name}
                                    </div>
                                    <img
                                        width="100%"
                                        className="animal-img img-fluid shadow-lg"
                                        src={restaurant.imageUrl}
                                    />
                                    <div className="card-body">
                                        <div className="animal-txt text-center">
                                            {restaurant.cost}
                                        </div>
                                        <div className="text-center">
                                            <AddRestaurant id={restaurant.id} />
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