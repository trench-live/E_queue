const API_BASE_URL = 'http://localhost:8080/api';

async function fetchApi(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });

    if (!response.ok) {
        const error = new Error(`Ошибка при запросе: ${response.statusText}`);
        error.status = response.status;
        throw error;
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
};