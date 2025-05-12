import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './OrderStatus.css';

const OrderStatus = () => {
    const { orderId } = useParams();
    const [status, setStatus] = useState('Loading...');

    useEffect(() => {
        const fetchOrderStatus = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/order/${orderId}/getStatus`,
                    {
                        headers: {
                            'X-API-KEY': process.env.REACT_APP_API_KEY
                        }
                    }
                );
                setStatus(response.data);
            } catch (error) {
                console.error('Ошибка получения статуса:', error);
                setStatus(error.response?.data?.message || 'Ошибка запроса');
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