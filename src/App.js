// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BannerGrid from "./components/BannerGrid";
import PopupBanner from "./components/PopupBanner";
import Dashboard from "./components/Dashboard";
import instance from "./api"; // Adjusted import path

function App() {
    const [banners, setBanners] = React.useState([]);
    const [showPopups, setShowPopups] = React.useState(false);

    React.useEffect(() => {
        const fetchBanners = async () => {
            const response = await instance.get("/api/banner");
            setBanners(response.data.filter((banner) => banner.visible));
        };
        fetchBanners();
    }, [showPopups]);

    const toggleBanners = () => {
        setShowPopups(!showPopups);
    };

    const closePopups = () => {
        setShowPopups(false);
    };

    return (
        <Router>
            <div>
                <Navbar onToggleBanners={toggleBanners} />
                {showPopups && (
                    <PopupBanner banners={banners} onClose={closePopups} />
                )}
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/"
                        element={<BannerGrid banners={banners} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
