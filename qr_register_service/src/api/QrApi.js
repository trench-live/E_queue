import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/qr';

export const generateQrCode = async (storeName, products) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/generate`,
            { storeName, products },
            { responseType: 'blob' }
        );
        return response.data; // Возвращаем Blob
    } catch (error) {
        console.error('Ошибка при генерации QR-кода:', error);
        throw error;
    }
};