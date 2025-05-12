const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function fetchApi(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.REACT_APP_API_KEY
        },
        ...options,
    });

    if (!response.ok) {
        const error = new Error(`Ошибка при запросе: ${response.statusText}`);
        error.status = response.status;
        throw error;
    }

    const contentLength = response.headers.get('Content-Length');
    if (response.status === 204 || contentLength === '0') {
        return null;
    }

    return response.json();
}

export const apiClient = {
    get: (endpoint) => fetchApi(endpoint),

    patch: (endpoint, params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        const urlWithParams = `${endpoint}?${queryParams}`;
        return fetchApi(urlWithParams, {
            method: 'PATCH',
        });
    },

    // Добавляем поддержку других методов при необходимости
    post: (endpoint, data) => fetchApi(endpoint, {
        method: 'POST',
        body: JSON.stringify(data)
    }),

    delete: (endpoint) => fetchApi(endpoint, {
        method: 'DELETE'
    })
};