import React, { useState } from 'react';
import TransactionTable from './TransactionTable';
import MobileCards from './MobileCards';
import TransactionModal from './TransactionModal';
import TransactionHeader from './TransactionHeader';
import { mockTransactions } from '../constants/mockData';
import '../styles/Transaction.css';

const Transaction = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTransaction = (newTransaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
    setIsModalOpen(false);
  };

  const handleDeleteTransaction = (id) => {
    const transactionToDelete = transactions.find(t => t.id === id);
    if (transactionToDelete && window.confirm(`آیا از حذف تراکنش "${transactionToDelete.description}" مطمئن هستید؟`)) {
      setTransactions(prev => prev.filter(transaction => transaction.id !== id));
    }
  };

  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  const hasTransactions = safeTransactions.length > 0;

  const renderEmptyState = () => (
    <div className="empty-state">
      <i className="fas fa-exclamation-circle"></i>
      <p>شما هنوز تراکنشی وارد نکرده‌اید.</p>
    </div>
  );

  const renderTransactionContent = () => {
    if (!hasTransactions) {
      return renderEmptyState();
    }

    return (
      <>
        <div className="desktop-view">
          <TransactionTable
            transactions={safeTransactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
        <div className="mobile-view">
          <MobileCards
            transactions={safeTransactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      </>
    );
  };

  return (
    <div className="transaction-container">
      <TransactionHeader onAddTransaction={() => setIsModalOpen(true)} />
      
      <main className="app-main">
        {renderTransactionContent()}
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