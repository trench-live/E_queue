import React from 'react';
import OrderItem from '../OrderItem/OrderItem';
import './OrderList.css';

function OrderList({ orders, statuses, onStatusChange, onDeleteOrder }) {
    return (
        <ul className="order-list">
            {orders.map((order) => (
                <OrderItem
                    key={order.id}
                    order={order}
                    statuses={statuses}
                    onStatusChange={onStatusChange}
                    onDeleteOrder={onDeleteOrder}
                />
            ))}
        </ul>
    );
}

export default OrderList;