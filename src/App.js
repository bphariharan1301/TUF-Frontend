import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Banner from "./components/Banner";
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Banner />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
