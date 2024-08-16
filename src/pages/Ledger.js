import React, { useEffect, useState } from 'react';
import { fetchLedgerInfo } from '../services/api';

const Ledger = () => {
    const [ledgerData, setLedgerData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLedgerInfo = async () => {
            try {
                const data = await fetchLedgerInfo();
                if (data.length === 0) {
                    setError('No ledger information available.');
                } else {
                    setLedgerData(data);
                }
            } catch (err) {
                setError('Failed to fetch ledger information.');
            } finally {
                setLoading(false);
            }
        };

        getLedgerInfo();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Ledger Information</h2>
            <ul>
                {ledgerData.map((entry, index) => (
                    <li key={index}>
                        Date: {entry.date}, Description: {entry.description}, Amount: {entry.amount}, Balance: {entry.balance}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Ledger;
