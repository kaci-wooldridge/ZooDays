import React from "react";

export default function Home() {
    return (
        <>
            <div className="banner-image-home">
                <div className="banner-text">
                    <h1></h1>
                </div>
                <img className="banner-bottom" src="https://prod.speakcdn.com/sitefiles/2147/images/texture-transition.png" alt="Decorative texture" />
            </div>

            <span style={{
                position: "fixed",
                left: 0,
                right: 0,
                top: "50%",
                marginTop: "-0.5rem",
                textAlign: "center",
            }}>
                hello
            </span>
        </>
    );
}