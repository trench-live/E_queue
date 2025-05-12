import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/qr`;

export const generateQrCode = async (storeName, products) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/generate`,
            { storeName, products },
            {
                responseType: 'blob',
                headers: {
                    'X-API-KEY': process.env.REACT_APP_API_KEY
                }
            }
        );
        return response.data; // Возвращаем Blob
    } catch (error) {
        console.error('Ошибка при генерации QR-кода:', error);
        throw error;
    }
};