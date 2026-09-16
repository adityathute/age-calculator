// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for Home

const Home = () => {
    return (
        <div className="home">
            <nav className="calculator-nav">
                <ul>
                    <li><Link to="/age-calculator">Age Calculator</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
