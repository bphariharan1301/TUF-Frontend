import React, { useState, useEffect } from "react";
import axios from "../api";

function Dashboard() {
    const [description, setDescription] = useState("");
    const [timer, setTimer] = useState(0);
    const [link, setLink] = useState("");

    useEffect(() => {
        const fetchBannerData = async () => {
            const response = await axios.get("/api/banner");
            const data = response.data;
            setDescription(data.description);
            setTimer(data.timer);
            setLink(data.link);
        };

        fetchBannerData();
    }, []);

    const handleUpdate = async () => {
        await axios.post("/api/banner", { description, timer, link });
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
            <button onClick={handleUpdate}>Update Banner</button>
        </div>
    );
}

export default Dashboard;
