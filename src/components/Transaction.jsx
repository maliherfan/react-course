import React, { useState } from 'react';
import TransactionTable from './TransactionTable';
import TransactionCard from './TransactionCard';
import TransactionModal from './TransactionModal';
import TransactionHeader from './TransactionHeader';
import { mockTransactions } from '../constants/mockData';
import '../styles/Transaction.css';

const Transaction = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatAmount = amount => {
    if (!amount) return '';
    const numericString = amount.toString().replace(/[^\d]/g, '');
    return numericString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleAddTransaction = newTransaction => {
    setTransactions(prev => [newTransaction, ...prev]);
    setIsModalOpen(false);
  };

  const handleDeleteTransaction = id => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  const hasTransactions = safeTransactions.length > 0;

  return (
    <div className="transaction-container">
      <TransactionHeader onAddTransaction={() => setIsModalOpen(true)} />

      <main className="app-main">
        {!hasTransactions ? (
          <div className="empty-state">
            <img src="public/icons/danger-circle.svg" width="24" height="24" />
            <p>شما هنوز تراکنشی وارد نکرده‌اید.</p>
          </div>
        ) : (
          <>
            <div className="desktop-view">
              <TransactionTable
                transactions={safeTransactions}
                onDeleteTransaction={handleDeleteTransaction}
                formatAmount={formatAmount}
              />
            </div>
            <div className="mobile-view">
              {safeTransactions.map(transaction => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onDelete={handleDeleteTransaction}
                  formatAmount={formatAmount}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {isModalOpen && (
        <TransactionModal
          onClose={() => setIsModalOpen(false)}
          onAddTransaction={handleAddTransaction}
        />
      )}
    </div>
  );
};

export default Transaction;
