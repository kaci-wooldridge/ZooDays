import React from "react";

const pictures = [
    "https://nationalzoo.si.edu/sites/default/files/animals/grevyszebra-005.jpg",
    "https://www.nczoo.org/sites/default/files/styles/hero_image_medium_/public/2020-08/Reilly_Mekita_2.jpg?h=ae0a076d&itok=jIoMcdWs",
    "https://images.ctfassets.net/pjshm78m9jt4/4Oi8IubmZNrNqS2vgfq1v7/aa305137d8a03a646ae6511e3713ca0e/B_Margaret_the_giraffe_calf_takes_first_steps_outside_at_ZSL_Whipsnade_Zoo_c_ZSL.jpg"
]

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 4000;

export default function PictureCarousel() {
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className="slideshow">
            <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {pictures.map((picture, index) => (
                    <img
                        className="slide"
                        key={index}
                        src={picture}>
                    </img>
                ))}
            </div>

            <div className="hours-container text-center">
                <div className="open-today">Open Today</div>
                <div className="time-open">9:30am - 5:00pm</div>
            </div>

            {/* <div className="slideshowDots">
                {colors.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshowDot${index === idx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div> */}
        </div>
    );
}

