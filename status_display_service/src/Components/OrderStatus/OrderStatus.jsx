import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './OrderStatus.css'; // Импортируем стили

const OrderStatus = () => {
    const { orderId } = useParams();
    const [status, setStatus] = useState('Loading...');

    useEffect(() => {
        const fetchOrderStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/order/${orderId}/getStatus`);
                setStatus(response.data);
            } catch (error) {
                setStatus('Failed to fetch status');
            }
        };

        fetchOrderStatus();
        const interval = setInterval(fetchOrderStatus, 5000);

        return () => clearInterval(interval);
    }, [orderId]);

    return (
        <div className="status-container">
            <h1>Order Status</h1>
            <p className="order-id">Order ID: {orderId}</p>
            <p className="order-status">Status: {status}</p>
        </div>
    );
};

export default OrderStatus;