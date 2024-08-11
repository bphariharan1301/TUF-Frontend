// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import instance from "../api"; // Adjusted import path

function Dashboard() {
    const { state } = useLocation();
    const banner = state?.banner || {}; // Default to empty object if no state

    const [description, setDescription] = useState(banner.description || "");
    const [timer, setTimer] = useState(banner.timer || 0);
    const [link, setLink] = useState(banner.link || "");
    const [visible, setVisible] = useState(banner.visible || false);

    const handleUpdate = async () => {
        await instance.post("/api/banner", {
            description,
            timer,
            link,
            visible,
            id: banner.id,
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Banner Dashboard</h2>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Banner Description"
            />
            <input
                type="number"
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
                placeholder="Timer (seconds)"
            />
            <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Banner Link"
            />
            <label>
                <input
                    type="checkbox"
                    checked={visible}
                    onChange={() => setVisible(!visible)}
                />
                Show Banner
            </label>
            <button onClick={handleUpdate}>Update Banner</button>
        </div>
    );
}

export default Dashboard;
