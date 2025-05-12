import React, { useEffect, useState } from 'react';
import { fetchOrders, fetchStatuses, updateOrderStatus, deleteOrder } from '../../services/OrderService';
import OrderList from '../OrderList/OrderList/OrderList';
import '../../global.css';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      // Обновляем локальное состояние, удаляя заказ из списка
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Ошибка при удалении заказа:', error);
    }
  };

  const loadData = async () => {
    try {
      const [ordersData, statusesData] = await Promise.all([fetchOrders(), fetchStatuses()]);
      setOrders(ordersData);
      setStatuses(statusesData);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  // AutoLoad content
  useEffect(() => {
    loadData();

    const intervalId = setInterval(loadData, 10000); // Обновление каждые 10 секунд

    return () => clearInterval(intervalId);
  }, []);

  // Status change handler
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
          prevOrders.map((order) =>
              order.id === orderId ? { ...order, status: newStatus } : order
          )
      );
    } catch (error) {
      console.error('Ошибка при обновлении статуса:', error);
    }
  };

  return (
      <div className="App">
        <h1>Список заказов</h1>
        <OrderList
            orders={orders}
            statuses={statuses}
            onStatusChange={handleStatusChange}
            onDeleteOrder={handleDeleteOrder}
        />
      </div>
  );
}

export default App;