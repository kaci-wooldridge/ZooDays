import React from "react";
import HomeTop from "./HomeTop";

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-page">
                <div className="picture-carousel">
                    <HomeTop />
                </div>
            </div>
        </div>
    );
}