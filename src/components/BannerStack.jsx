// src/components/BannerStack.js
import React from "react";

function BannerStack({ banners }) {
    return (
        <div
            style={{ position: "relative", height: "200px", margin: "20px 0" }}
        >
            {banners.slice(0, 3).map((banner, index) => (
                <div
                    key={banner.id}
                    style={{
                        position: "absolute",
                        top: `${index * 10}px`,
                        left: `${index * 10}px`,
                        width: "80%",
                        backgroundColor: "lightblue",
                        padding: "10px",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                        zIndex: banners.length - index,
                        cursor: "pointer",
                    }}
                >
                    <h3>{banner.description}</h3>
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

export default BannerStack;
