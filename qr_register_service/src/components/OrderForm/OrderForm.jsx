import React from 'react';
import { useOrderForm } from './useOrderForm';
import ProductInput from './ProductInput';
import FormButtons from './FormButtons';
import styles from './OrderForm.module.css';

const OrderForm = ({ onOrderSubmit }) => {
    const {
        storeName,
        products,
        loading,
        handleProductNameChange,
        handleProductQuantityChange,
        handleProductBlur,
        handleSubmit,
        handleClear,
    } = useOrderForm(onOrderSubmit);

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Магазин: {storeName}</h3>
            <h3>Введите товары:</h3>
            {products.map((product, index) => (
                <ProductInput
                    key={index}
                    product={product}
                    index={index}
                    handleProductNameChange={handleProductNameChange}
                    handleProductQuantityChange={handleProductQuantityChange}
                    handleProductBlur={handleProductBlur}
                />
            ))}
            <FormButtons
                loading={loading}
                handleSubmit={handleSubmit}
                handleClear={handleClear}
            />
        </form>
    );
};

export default OrderForm;