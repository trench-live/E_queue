import React, { useState, useEffect } from 'react';
import OrderStatusSelect from '../OrderStatusSelect/OrderStatusSelect';
import './OrderItem.css';

function OrderItem({ order, statuses, onStatusChange, onDeleteOrder }) {
    const [isPendingDeletion, setIsPendingDeletion] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5); // Таймер на 5 секунд

    // Delete countdown
    useEffect(() => {
        if (isPendingDeletion && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (isPendingDeletion && timeLeft === 0) {
            onDeleteOrder(order.id); // Используем переданную функцию
            setIsPendingDeletion(false); // Сбрасываем состояние
        }
    }, [isPendingDeletion, timeLeft, onDeleteOrder, order.id]);

    // Delete button handler
    const handleDeleteClick = () => {
        if (isPendingDeletion) {
            setIsPendingDeletion(false);
        } else {
            setIsPendingDeletion(true);
            setTimeLeft(5);
        }
    };

    return (
        <li className="order-item">
            <div>
                <strong>Заказ #{order.id}</strong>
                <p>Магазин: {order.storeName}</p>
                <div className="products-list">
                    <h4>Товары:</h4>
                    <ul>
                        {order.products.map((product) => (
                            <li key={product.id}>
                                {product.name} (Количество: {product.quantity})
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="actions">
                    <OrderStatusSelect
                        orderId={order.id}
                        currentStatus={order.status}
                        statuses={statuses}
                        onStatusChange={onStatusChange}
                    />
                    <button
                        className={`delete-button ${isPendingDeletion ? 'pending' : ''}`}
                        onClick={handleDeleteClick}
                    >
                        {isPendingDeletion ? `Отменить (${timeLeft})` : 'Закрыть заказ'}
                    </button>
                </div>
            </div>
        </li>
    );
}

export default OrderItem;