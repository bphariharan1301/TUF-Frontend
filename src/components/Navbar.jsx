// src/components/Navbar.js
import React from "react";

function Navbar({ onToggleBanners }) {
    return (
        <nav
            style={{
                padding: "10px",
                backgroundColor: "#333",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <h2>My Website</h2>
            <button
                onClick={onToggleBanners}
                style={{ padding: "5px 10px", cursor: "pointer" }}
            >
                Toggle Banners
            </button>
        </nav>
    );
}

export default Navbar;
