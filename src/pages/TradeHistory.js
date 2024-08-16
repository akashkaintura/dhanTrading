import React, { useState } from 'react';
import { fetchTradeHistory } from '../services/api';

const TradeHistory = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [tradeHistory, setTradeHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateDates = () => {
        const fromDateObj = new Date(fromDate);
        const toDateObj = new Date(toDate);
        const maxRangeInDays = 365;

        if (!fromDate || !toDate) {
            setError('Both "From" and "To" dates are required.');
            return false;
        }
        if (fromDateObj > toDateObj) {
            setError('The "From" date cannot be later than the "To" date.');
            return false;
        }
        if ((toDateObj - fromDateObj) / (1000 * 60 * 60 * 24) > maxRangeInDays) {
            setError('The date range should not exceed 1 year.');
            return false;
        }
        return true;
    };

    const getTradeHistory = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchTradeHistory(fromDate, toDate, pageNumber);
            if (data.length === 0) {
                setError('No trade history available for the selected date range.');
            } else {
                setTradeHistory(data);
            }
        } catch (err) {
            if (err.response) {
                setError(`Error ${err.response.status}: ${err.response.data.message || 'An error occurred'}`);
            } else if (err.request) {
                setError('No response from the server. Please try again later.');
            } else {
                setError(`An error occurred: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateDates()) {
            getTradeHistory();
        }
    };

    const handleDateChange = (setter) => (e) => {
        setter(e.target.value);
        setError(null);
    };

    const handleNextPage = () => {
        setPageNumber((prev) => prev + 1);
        getTradeHistory();
    };

    const handlePrevPage = () => {
        if (pageNumber > 1) {
            setPageNumber((prev) => prev - 1);
            getTradeHistory();
        }
    };

    return (
        <div>
            <h2>Trade History</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={fromDate}
                    onChange={handleDateChange(setFromDate)}
                    required
                />
                <input
                    type="date"
                    value={toDate}
                    onChange={handleDateChange(setToDate)}
                    required
                />
                <button type="submit">Fetch History</button>
            </form>

            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {tradeHistory.length > 0 && (
                <>
                    <ul>
                        {tradeHistory.map((trade, index) => (
                            <li key={index}>
                                Date: {trade.date}, Transaction: {trade.transaction}, Amount: {trade.amount}, Status: {trade.status}
                            </li>
                        ))}
                    </ul>
                    <div>
                        <button onClick={handlePrevPage} disabled={pageNumber === 1}>Previous</button>
                        <button onClick={handleNextPage}>Next</button>
                    </div>
                </>
            )}
            {!loading && !error && tradeHistory.length === 0 && (
                <p>No trade history available for the selected date range.</p>
            )}
        </div>
    );
};

export default TradeHistory;
