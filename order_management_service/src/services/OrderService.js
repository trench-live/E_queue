import { apiClient } from './ApiClient';

// Get all orders
export const fetchOrders = async () => {
    try {
        return await apiClient.get('/order');
    } catch (error) {
        console.error('Ошибка при получении заказов:', error.message);
        throw error;
    }
};

// Get all statuses
export const fetchStatuses = async () => {
    try {
        return await apiClient.get('/status/getStatuses');
    } catch (error) {
        console.error('Ошибка при получении статусов:', error.message);
        throw error;
    }
};

// Update order status
export const updateOrderStatus = async (orderId, newStatus) => {
    try {
        return await apiClient.patch(`/order/${orderId}/setStatus`, { status: newStatus });
    } catch (error) {
        console.error('Ошибка при обновлении статуса заказа:', error.message);
        throw error;
    }
};