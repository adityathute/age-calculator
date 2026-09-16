// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AgeCalculator from './components/AgeCalculator';
import Home from './pages/Home';
import './components/AgeCalculator.css'; // Import the CSS file if needed

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/age-calculator" element={<AgeCalculator />} />
            </Routes>
        </Router>
    );
};

export default App;
