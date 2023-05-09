import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, CardHeader, CardFooter } from "reactstrap";
import { getAllAnimals } from "../modules/animalManager";
import AddAnimal from "./AddAnimal";
import banner1 from "../images/banner1.png";


export default function Animals() {
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();



    const getAnimals = () => {
        getAllAnimals().then(animals => setAnimals(animals));
    };

    useEffect(() => {
        getAnimals();
    }, []);

    return (
        <>
            <div className="banner-image">
                <div className="banner-text">
                    <h1>Our Animals</h1>
                </div>
                <img className="banner-bottom" src="https://prod.speakcdn.com/sitefiles/2147/images/texture-transition.png" alt="Decorative texture" />
            </div>

            <Row>
                {
                    animals.map((animal) => {
                        return (
                            <Col key={animal.id} className="fluid animal-container" xs="4">
                                <Card className="img-fluid border-2  animal-card" style={{ height: '100%' }}>
                                    <div className="card-top text-center" >
                                        {animal.name}
                                    </div>
                                    <img
                                        width="100%"
                                        className="animal-img img-fluid shadow-lg"
                                        src={animal.imageUrl}
                                    />
                                    <div className="card-body">
                                        <div className="animal-txt text-center">
                                            {animal.description}
                                        </div>
                                        <div className="card-bottom text-center">
                                            <AddAnimal id={animal.id} />
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

