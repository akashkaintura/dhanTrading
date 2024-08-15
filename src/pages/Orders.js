// src/pages/Orders.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <h2>Your Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>{order.symbol} - {order.quantity} @ {order.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;
