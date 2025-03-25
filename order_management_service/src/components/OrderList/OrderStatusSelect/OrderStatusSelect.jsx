import React from 'react';
import './OrderStatusSelect.css';

function OrderStatusSelect({ orderId, currentStatus, statuses, onStatusChange }) {
    return (
        <select
            className="status-select"
            value={currentStatus}
            onChange={(e) => onStatusChange(orderId, e.target.value)}
        >
            {statuses.map((status) => (
                <option key={status.name} value={status.name}>
                    {status.displayName}
                </option>
            ))}
        </select>
    );
}

export default OrderStatusSelect;