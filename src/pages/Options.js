import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Options = () => {
    const [optionsData, setOptionsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOptionsData = async () => {
            try {
                const response = await axios.get('https://web.dhan.co/index/markets/Options', {
                    headers: {
                        'access-token': process.env.ACCESS_TOKEN,
                    },
                });
                setOptionsData(response.data);
            } catch (err) {
                setError('Error fetching options data.');
            } finally {
                setLoading(false);
            }
        };

        fetchOptionsData();
    }, []);

    const formatChange = (change) => {
        if (change.includes('-')) {
            return <span style={{ color: 'red' }}>{change}</span>;
        }
        return <span style={{ color: 'green' }}>{change}</span>;
    };

    return (
        <div>
            <h2>Options Data</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && optionsData.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Price</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {optionsData.map((option, index) => (
                            <tr key={index}>
                                <td>{option.name}</td>
                                <td>{option.price}</td>
                                <td>{formatChange(option.change)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {!loading && !error && optionsData.length === 0 && <p>No options data available.</p>}
        </div>
    );
};

export default Options;
