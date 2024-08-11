// src/components/BannerGrid.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Grid,
    Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import instance from "../api"; // Adjusted import path

function BannerGrid({ banners }) {
    const navigate = useNavigate();

    const handleEdit = (banner) => {
        navigate("/dashboard", { state: { banner } });
    };

    return (
        <Grid container spacing={3} style={{ padding: "20px" }}>
            {banners.map((banner) => (
                <Grid item xs={12} sm={6} md={4} key={banner.id}>
                    <Card>
                        <CardContent>
                            <IconButton
                                onClick={() => handleEdit(banner)}
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                            <Typography variant="h5" component="div">
                                {banner.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Time Left: {banner.timer} seconds
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                href={banner.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default BannerGrid;
