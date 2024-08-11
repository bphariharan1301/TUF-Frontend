import React, { useState, useEffect } from "react";
import instance from "./api";

function Banner() {
    const [banners, setBanners] = useState([]);
    const [popupBanners, setPopupBanners] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await instance.get("/api/latest-banners");
                setBanners(response.data);
                setPopupBanners(response.data); // Set the latest 3 banners for popups
            } catch (error) {
                console.error("Error fetching banners:", error);
            }
        };

        fetchBanners();
    }, []);

    const closePopup = (id) => {
        setPopupBanners((prevBanners) =>
            prevBanners.filter((banner) => banner.id !== id)
        );
    };

    return (
        <>
            {popupBanners.map((banner) => (
                <div
                    key={banner.id}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: `${10 + popupBanners.indexOf(banner) * 10}px`,
                        padding: "10px",
                        backgroundColor: "lightblue",
                        textAlign: "center",
                        zIndex: 1000, // Ensure popups are on top
                        border: "1px solid black",
                        borderRadius: "5px",
                    }}
                >
                    <h1>{banner.description}</h1>
                    <p>Time left: {Math.max(banner.timer, 0)} seconds</p>
                    <a
                        href={banner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn More
                    </a>
                    <button
                        style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            border: "none",
                            backgroundColor: "red",
                            color: "white",
                            cursor: "pointer",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            textAlign: "center",
                            lineHeight: "20px",
                        }}
                        onClick={() => closePopup(banner.id)}
                    >
                        X
                    </button>
                </div>
            ))}
        </>
    );
}

export default Banner;
