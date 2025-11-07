import React, { useState, useEffect } from 'react';
import TransactionTable from './Components/TransactionTable/TransactionTable';
import TransactionCard from './Components/TransactionCard/TransactionCard';
import TransactionModal from './Components/Modal/TransactionModal';
import TransactionHeader from './Components/TransactionHeader/TransactionHeader';
import { mockTransactions } from '../../constants/mockData';
import './Transaction.css';

const Transaction = () => {
  //  read data from localStorage
  const getInitialTransactions = () => {
    try {
      const savedData = localStorage.getItem('expenseTrackerData');
      if (savedData) {
        return JSON.parse(savedData);
      }
      // if localStorage is empty, then use mockDate
      return mockTransactions;
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return mockTransactions;
    }
  };

  const [transactions, setTransactions] = useState(getInitialTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // store in localStorage whenever transaction change
  useEffect(() => {
    try {
      localStorage.setItem('expenseTrackerData', JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [transactions]);

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
