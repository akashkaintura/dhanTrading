// src/pages/MarketData.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';

const MarketData = () => {
    const [marketData, setMarketData] = useState([]);

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const response = await api.get('/market-data');
                setMarketData(response.data);
            } catch (error) {
                console.error('Error fetching market data:', error);
            }
        };
        fetchMarketData();
    }, []);

    return (
        <div>
            <h2>Market Data</h2>
            <ul>
                {marketData.map(data => (
                    <li key={data.symbol}>{data.symbol} - {data.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default MarketData;
