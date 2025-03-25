import { useState } from 'react';
import { generateQrCode } from '../../api/QrApi';

// Helper functions for working with products
const updateProductName = (products, index, value) => {
    const newProducts = [...products];
    newProducts[index].name = value;
    return newProducts;
};

const updateProductQuantity = (products, index, value) => {
    const newProducts = [...products];
    newProducts[index].quantity = parseInt(value, 10) || 1;
    return newProducts;
};

const removeEmptyProduct = (products, index) => {
    const newProducts = [...products];
    if (newProducts[index].name.trim() === '' && index !== products.length - 1) {
        newProducts.splice(index, 1);
    }
    return newProducts;
};

const addNewProductIfNeeded = (products, index, value) => {
    if (index === products.length - 1 && value.trim() !== '') {
        return [...products, { name: '', quantity: 1 }];
    }
    return products;
};

const filterEmptyProducts = (products) => {
    return products.filter((product) => product.name.trim() !== '');
};

const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const useOrderForm = (onOrderSubmit) => {
    const [storeName, setStoreName] = useState('Магазин 1');
    const [products, setProducts] = useState([{ name: '', quantity: 1 }]);
    const [loading, setLoading] = useState(false);

    // Handler for changing the product name
    const handleProductNameChange = (index, value) => {
        let newProducts = updateProductName(products, index, value);
        newProducts = addNewProductIfNeeded(newProducts, index, value);
        setProducts(newProducts);
    };

    // Handler for changing the product quantity
    const handleProductQuantityChange = (index, value) => {
        const newProducts = updateProductQuantity(products, index, value);
        setProducts(newProducts);
    };

    // Handler for removing a product if its name is empty
    const handleProductBlur = (index) => {
        const newProducts = removeEmptyProduct(products, index);
        setProducts(newProducts);
    };

    // Handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const filteredProducts = filterEmptyProducts(products);
            const blob = await generateQrCode(storeName, filteredProducts);

            // Convert Blob to base64
            const base64 = await blobToBase64(blob);
            onOrderSubmit(base64); // Pass the base64 string to the parent component
        } catch (error) {
            console.error('Error creating order:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handler for clearing the form
    const handleClear = () => {
        setStoreName('Магазин 1'); // Reset the store name
        setProducts([{ name: '', quantity: 1 }]); // Reset the products
    };

    return {
        storeName,
        products,
        loading,
        handleProductNameChange,
        handleProductQuantityChange,
        handleProductBlur,
        handleSubmit,
        handleClear,
    };
};