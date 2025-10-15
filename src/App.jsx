import React from 'react';
import TransactionTable from './components/TransactionTable';
import { mockTransactions } from './components/mockData';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>تراکنش‌ها</h1>
      <TransactionTable transactions={mockTransactions} />
    </div>
  );
}

export default App;
