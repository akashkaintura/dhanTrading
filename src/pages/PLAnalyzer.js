// src/pages/PLAnalyzer.js

import React, { useEffect, useState } from 'react';
import { fetchFundLimit } from '../services/api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PLAnalyzer = () => {
    const [fundData, setFundData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFundData = async () => {
            try {
                const data = await fetchFundLimit();
                setFundData(data);
            } catch (err) {
                setError('Failed to fetch fund data.');
            } finally {
                setLoading(false);
            }
        };

        getFundData();
    }, []);

    const calculatePL = (fundData) => {
        // Assuming fundData contains an array of fund objects with date and current balance
        const plData = fundData.map((fund) => ({
            date: fund.date, // Assuming date is a property of fund
            profitLoss: fund.currentBalance - fund.initialBalance, // Calculate P&L
        }));
        return plData;
    };

    const plData = calculatePL(fundData);

    const chartData = {
        labels: plData.map((entry) => entry.date),
        datasets: [
            {
                label: 'Profit/Loss',
                data: plData.map((entry) => entry.profitLoss),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Profit and Loss Analyzer',
            },
        },
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Profit and Loss Analyzer</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default PLAnalyzer;
