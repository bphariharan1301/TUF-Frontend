// src/components/PopupBanners.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../api"; // Adjusted import path

function PopupBanners() {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await instance.get("/api/banner");
                const data = response.data.filter((banner) => banner.visible);
                setBanners(data.slice(-3)); // Get the last 3 banners
                setCurrentIndex(0);
            } catch (error) {
                console.error("Error fetching banners:", error);
            }
        };

        fetchBanners();
    }, []);

    useEffect(() => {
        if (banners.length === 0 || currentIndex >= banners.length) return;

        const banner = banners[currentIndex];
        setTimeLeft(banner.timer);

        // Clear previous interval if it exists
        if (intervalId) {
            clearInterval(intervalId);
        }

        const id = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(id);
                    handleNextBanner();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        setIntervalId(id);

        return () => clearInterval(id);
    }, [currentIndex, banners]);

    const handleNextBanner = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex + 1 >= banners.length) {
                // Close popups if at the end
                navigate("/");
                return prevIndex; // Stay at the last index
            }
            return prevIndex + 1;
        });
    };

    const handleClose = () => {
        handleNextBanner();
    };

    if (banners.length === 0) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 9999,
                overflow: "hidden",
            }}
        >
            {banners.map(
                (banner, index) =>
                    index === currentIndex && (
                        <div
                            key={banner.id}
                            style={{
                                position: "absolute",
                                width: "80%",
                                maxWidth: "500px",
                                backgroundColor: "white",
                                padding: "20px",
                                borderRadius: "8px",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            }}
                        >
                            <button
                                onClick={handleClose}
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    background: "none",
                                    border: "none",
                                    fontSize: "20px",
                                    cursor: "pointer",
                                }}
                            >
                                ✖
                            </button>
                            <h3>{banner.description}</h3>
                            <p>Time Left: {timeLeft} seconds</p>
                            <a
                                href={banner.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Learn More
                            </a>
                        </div>
                    )
            )}
        </div>
    );
}

export default PopupBanners;
