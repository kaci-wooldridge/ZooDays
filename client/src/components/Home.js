import React from "react";
import PictureCarousel from "./PictureCarousel";

export default function Home() {
    return (
        <>
            <div className="home-page">
                <div className="picture-carousel">
                    <PictureCarousel />
                </div>
            </div>
        </>
    );
}