import React, { useState } from 'react';
import OrderForm from '../OrderForm/OrderForm';
import QrCodeDisplay from '../QrCodeDisplay/QrCodeDisplay';
import styles from './App.module.css';

const App = () => {
    const [qrCode, setQrCode] = useState('');

    return (
        <div className={styles.app}>
            <h1>Создание заказа</h1>
            <OrderForm onOrderSubmit={setQrCode} />
            <QrCodeDisplay qrCode={qrCode} />
        </div>
    );
};

export default App;