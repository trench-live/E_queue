import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderStatus from '../OrderStatus/OrderStatus';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/order/:orderId" element={<OrderStatus />} />
            </Routes>
        </Router>
    );
}

export default App;