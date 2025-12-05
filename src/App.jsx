import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Transaction from './pages/Transactions/Transaction';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="expenses" element={<Transaction />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
