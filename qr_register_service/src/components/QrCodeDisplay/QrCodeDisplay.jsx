import React from 'react';
import styles from './QrCodeDisplay.module.css';

const QrCodeDisplay = ({ qrCode }) => {
    if (!qrCode) return null;

    return (
        <div className={styles.container}>
            <h3>QR-код для заказа:</h3>
            <div className={styles.qrCode}>
                <img src={qrCode} alt="QR Code" />
            </div>
        </div>
    );
};

export default QrCodeDisplay;