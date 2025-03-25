import React from 'react';
import styles from './OrderForm.module.css';

const ProductInput = ({
                          product,
                          index,
                          handleProductNameChange,
                          handleProductQuantityChange,
                          handleProductBlur,
                      }) => {
    return (
        <div className={styles.productContainer}>
            <input
                type="text"
                value={product.name}
                onChange={(e) => handleProductNameChange(index, e.target.value)}
                onBlur={() => handleProductBlur(index)}
                placeholder={`Название товара ${index + 1}`}
                className={styles.input}
            />
            <input
                type="number"
                value={product.quantity}
                onChange={(e) => handleProductQuantityChange(index, e.target.value)}
                min="1"
                placeholder="Количество"
                className={styles.quantityInput}
            />
        </div>
    );
};

export default ProductInput;