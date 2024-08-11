// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import {
    Button,
    TextField,
    Container,
    Typography,
    FormControl,
    FormLabel,
    Switch,
    FormControlLabel,
} from "@mui/material";
import instance from "../api"; // Adjusted import path

function Dashboard() {
    const [description, setDescription] = useState("");
    const [timer, setTimer] = useState(0);
    const [link, setLink] = useState("");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchBannerData = async () => {
            const response = await instance.get("/api/banner");
            const data = response.data;
            setDescription(data.description);
            setTimer(data.timer);
            setLink(data.link);
            setVisible(data.visible);
        };

        fetchBannerData();
    }, []);

    const handleUpdate = async () => {
        await instance.post("/api/banner", {
            description,
            timer,
            link,
            visible,
        });
    };

    return (
        <Container style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Banner Dashboard
            </Typography>
            <FormControl fullWidth style={{ marginBottom: "20px" }}>
                <TextField
                    label="Banner Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                />
            </FormControl>
            <FormControl fullWidth style={{ marginBottom: "20px" }}>
                <TextField
                    label="Timer (seconds)"
                    type="number"
                    variant="outlined"
                    value={timer}
                    onChange={(e) => setTimer(e.target.value)}
                    fullWidth
                />
            </FormControl>
            <FormControl fullWidth style={{ marginBottom: "20px" }}>
                <TextField
                    label="Banner Link"
                    variant="outlined"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    fullWidth
                />
            </FormControl>
            <FormControlLabel
                control={
                    <Switch
                        checked={visible}
                        onChange={(e) => setVisible(e.target.checked)}
                    />
                }
                label="Banner Visible"
            />
            <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update Banner
            </Button>
        </Container>
    );
}

export default Dashboard;
