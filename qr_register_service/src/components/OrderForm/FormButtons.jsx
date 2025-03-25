import React from 'react';
import styles from './OrderForm.module.css';

const FormButtons = ({ loading, handleSubmit, handleClear }) => {
    return (
        <div className={styles.buttonsContainer}>
            <button type="submit" disabled={loading} className={styles.button}>
                {loading ? 'Отправка...' : 'Создать заказ'}
            </button>
            <button
                type="button"
                onClick={handleClear}
                className={styles.clearButton}
            >
                Очистить
            </button>
        </div>
    );
};

export default FormButtons;