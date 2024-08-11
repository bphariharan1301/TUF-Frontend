import React, { useState, useEffect } from "react";
import axios from "../api";

function Banner() {
    const [showBanner, setShowBanner] = useState(false);
    const [description, setDescription] = useState("");
    const [timer, setTimer] = useState(0);
    const [link, setLink] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const fetchBannerData = async () => {
            const response = await axios.get("/api/banner");
            const data = response.data;
            setShowBanner(data.showBanner);
            setDescription(data.description);
            setTimer(data.timer);
            setLink(data.link);
            setTimeLeft(data.timer);
        };

        fetchBannerData();
    }, []);

    useEffect(() => {
        if (showBanner && timer > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            if (timeLeft <= 0) {
                clearInterval(interval);
                setShowBanner(false);
            }

            return () => clearInterval(interval);
        }
    }, [showBanner, timeLeft]);

    return showBanner ? (
        <div
            style={{
                padding: "10px",
                backgroundColor: "lightblue",
                textAlign: "center",
            }}
        >
            <h1>{description}</h1>
            <p>Time left: {Math.max(timeLeft, 0)} seconds</p>
            <a href={link} target="_blank" rel="noopener noreferrer">
                Learn More
            </a>
        </div>
    ) : null;
}

export default Banner;
