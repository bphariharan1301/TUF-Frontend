// src/components/BannerGrid.js
import React from "react";
import { useNavigate } from "react-router-dom";
import instance from "../api"; // Adjusted import path

function BannerGrid({ banners }) {
    const navigate = useNavigate();

    const handleEdit = (banner) => {
        navigate("/dashboard", { state: { banner } });
    };

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "20px",
                padding: "20px",
            }}
        >
            {banners.map((banner) => (
                <div
                    key={banner.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        backgroundColor: "#f9f9f9",
                        position: "relative",
                    }}
                >
                    <button
                        onClick={() => handleEdit(banner)}
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        ✎
                    </button>
                    <h3>{banner.description}</h3>
                    <p>Time Left: {banner.timer} seconds</p>
                    <a
                        href={banner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn More
                    </a>
                </div>
            ))}
        </div>
    );
}

export default BannerGrid;
