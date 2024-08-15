// src/services/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.dhan.co',
    headers: {
        'Content-Type': 'application/json',
        'access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkaGFuIiwicGFydG5lcklkIjoiIiwiZXhwIjoxNzI0MzE3OTYzLCJ0b2tlbkNvbnN1bWVyVHlwZSI6IlNFTEYiLCJ3ZWJob29rVXJsIjoiIiwiZGhhbkNsaWVudElkIjoiMTEwMDIwODU0OSJ9.xD7Lxe6jJLJx5Ej4ZWejdUPo-0mVz9b1hVjIPZ_WbYpdikIEN0oEExb2RZCg7Tx86OG06EqWA_ef-MEusPTXRQ',
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


export default api;
