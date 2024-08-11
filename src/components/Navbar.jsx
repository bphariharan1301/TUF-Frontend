// src/components/Navbar.js
import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
// import BannerIcon from "@mui/icons-material/Banner";

import PopupBanners from "./PopupBanner";

function Navbar() {
    const [showBanners, setShowBanners] = useState(false);
    const [banners, setBanners] = useState([]); // Assuming you fetch banners here

    const handleToggleBanners = () => {
        setShowBanners((prev) => !prev);
    };

    const handleClosePopupBanners = () => {
        setShowBanners(false);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">My App</Typography>
                <Button
                    edge="start"
                    color="inherit"
                    aria-label="banner"
                    onClick={handleToggleBanners}
                >
                    Toogle Banners
                </Button>
            </Toolbar>
            {showBanners && (
                <PopupBanners
                    banners={banners}
                    onClose={handleClosePopupBanners}
                />
            )}
        </AppBar>
    );
}

export default Navbar;
