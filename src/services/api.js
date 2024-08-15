import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        'Content-Type': 'application/json',
        'access-token': process.env.ACCESS_TOKEN,
    },
});

export const fetchLedgerInfo = async () => {
    try {
        const response = await api.get('/ledger');
        console.log('Ledger Data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching ledger info:', error);
        throw error;
    }
};

export const fetchTradeHistory = async (fromDate, toDate, pageNumber) => {
    try {
        const response = await api.get(`/tradeHistory/${fromDate}/${toDate}/${pageNumber}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching trade history:', error);
        throw error;
    }
};


export const fetchFundLimit = async () => {
    try {
        const response = await api.get('/fundlimit');
        return response.data;
    } catch (error) {
        console.error('Error fetching fund limit:', error);
        throw error;
    }
};

export const sendPostbackData = async (data) => {
    try {
        const response = await fetch('/.netlify/functions/postback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error sending postback data:', error);
        throw error;
    }
};


export default api;
