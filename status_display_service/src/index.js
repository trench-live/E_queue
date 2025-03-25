import React from 'react';
import ReactDOM from 'react-dom/client'; // Используем ReactDOM из 'react-dom/client' для React 18+
import App from './Components/App/App';
import './index.css'; // Импортируем стили

// Создаем корневой элемент и рендерим приложение
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);