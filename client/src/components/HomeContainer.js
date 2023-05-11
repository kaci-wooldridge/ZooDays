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



            <div className="home-container2">
                <div>
                    <div className="home-text" >
                        At our zoo, we believe that education and
                        entertainment go hand in hand. With fascinating
                        animals, engaging exhibits, and hands-on activities,
                        we're dedicated to creating a fun and
                        educational experience for visitors of all ages.
                    </div>
                </div>
                <img className="home-elephant-picture" src="https://gray-wect-prod.cdn.arcpublishing.com/resizer/pMCbtCq8-tpNSdwHIOQsCmiCSIE=/1200x1200/smart/filters:quality(85)/cloudfront-us-east-1.images.arcpublishing.com/gray/T222N23QLFFUPJXIADKBH5YOFE.jpg"></img>
            </div>

            <div className="home-container3">
                <img className="home-fox-picture" src="https://allthingsfoxes.com/wp-content/uploads/2021/05/mother-fox-behavior.jpg"></img>
                <div>
                    <div className="home-text" >
                        Our zoo has a new reason to celebrate - the arrival of a baby red fox!
                        This little ball of energy is already running and playing with its parents,
                        and has quickly become a crowd favorite among our visitors.
                        Our knowledgeable staff is eager to teach you more about red foxes and how they survive in the wild.
                        Don't miss the chance to meet our adorable new addition and learn about the vital role they play in our ecosystem.
                    </div>
                </div>
                
            </div>


        </div>
    );
}