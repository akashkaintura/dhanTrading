import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'access-token': process.env.REACT_APP_ACCESS_TOKEN,
    },
});

// Fetch Ledger Information
export const fetchLedgerInfo = async () => {
    const options = {
        method: 'GET',
        url: '/ledger',
        headers: {
            'access-token': process.env.REACT_APP_ACCESS_TOKEN,
            Accept: 'application/json',
        },
    };

    try {
        const { data } = await api.request(options);
        console.log('Ledger Data fetched successfully:', data);
        return data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Fetch Trade History
export const fetchTradeHistory = async (from_date, to_date, page_number = 0) => {
    const options = {
        method: 'GET',
        url: `/tradeHistory/${from_date}/${to_date}/${page_number}`,
        headers: {
            'access-token': process.env.REACT_APP_ACCESS_TOKEN,
            Accept: 'application/json',
        },
    };

    try {
        const { data } = await api.request(options);
        return data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Fetch Fund Limit
export const fetchFundLimit = async () => {
    const options = {
        method: 'GET',
        url: '/fundlimit',
        headers: {
            'access-token': process.env.REACT_APP_ACCESS_TOKEN,
            Accept: 'application/json',
        },
    };

    try {
        const { data } = await api.request(options);
        return data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
};

// Send Postback Data
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
            throw new Error(`Network response was not ok (status: ${response.status})`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error sending postback data:', error);
        throw error;
    }
};

// Handle API Errors
const handleApiError = (error) => {
    if (error.response) {
        const { status } = error.response;
        switch (status) {
            case 400:
                console.error('Bad Request:', error.response.data);
                break;
            case 401:
                console.error('Unauthorized:', error.response.data);
                break;
            case 404:
                console.error('Not Found:', error.response.data);
                break;
            case 500:
                console.error('Internal Server Error:', error.response.data);
                break;
            default:
                console.error('Unexpected error:', error.response);
        }
    } else {
        console.error('Network error:', error);
    }
};

export default api;
