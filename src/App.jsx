import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TransactionProvider } from './context/TransactionContext';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Transaction from './pages/Transactions/Transaction';
import NotFound from './pages/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <TransactionProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="expenses" element={<Transaction />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </TransactionProvider>
  );
}

export default App;
