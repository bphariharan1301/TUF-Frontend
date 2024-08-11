// src/components/PopupBanners.js
import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function PopupBanners({ banners, onClose }) {
    const [currentBanners, setCurrentBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(true);

    useEffect(() => {
        if (banners.length > 0) {
            const lastThreeBanners = banners.slice(-3); // Take the last 3 banners
            setCurrentBanners(lastThreeBanners);
            setCurrentIndex(0);
            setDialogOpen(true); // Ensure dialog is open
        }
    }, [banners]);

    useEffect(() => {
        if (
            currentBanners.length === 0 ||
            currentIndex >= currentBanners.length
        )
            return;

        const banner = currentBanners[currentIndex];
        setTimeLeft(banner.timer);

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

        return () => clearInterval(id);
    }, [currentIndex, currentBanners]);

    const handleNextBanner = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex + 1 >= currentBanners.length) {
                // Close dialog if at the end
                setDialogOpen(false);
                onClose(); // Notify parent to reset or hide the component
                return prevIndex; // Stay at the last index
            }
            return prevIndex + 1;
        });
    };

    const handleClose = () => {
        handleNextBanner();
    };

    if (!dialogOpen || currentBanners.length === 0) return null;

    const currentBanner = currentBanners[currentIndex];

    return (
        <Dialog
            open={dialogOpen}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                style: {
                    position: "relative",
                    padding: "20px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                },
            }}
        >
            <IconButton
                onClick={handleClose}
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogTitle>
                <Typography variant="h6">
                    {currentBanner.description}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Time Left: {timeLeft} seconds
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    href={currentBanner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginTop: "10px" }}
                >
                    Learn More
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default PopupBanners;
