// src/pages/Portfolio.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await api.get('/portfolio');
                setPortfolio(response.data);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        };
        fetchPortfolio();
    }, []);

    return (
        <div>
            <h2>Your Portfolio</h2>
            <ul>
                {portfolio.map(asset => (
                    <li key={asset.id}>{asset.symbol} - {asset.quantity}</li>
                ))}
            </ul>
        </div>
    );
};

export default Portfolio;
