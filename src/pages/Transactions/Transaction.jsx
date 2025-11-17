import React, { useState } from 'react';
import { useTransaction } from '../../context/TransactionContext';
import TransactionTable from './Components/TransactionTable/TransactionTable';
import TransactionCard from './Components/TransactionCard/TransactionCard';
import TransactionModal from './Components/Modal/TransactionModal';
import TransactionHeader from './Components/TransactionHeader/TransactionHeader';
import './Transaction.css';

const Transaction = () => {
  const { transactions, modalState, setModalState } = useTransaction();

  const formatAmount = amount => {
    if (!amount) return '';
    const numericString = amount.toString().replace(/[^\d]/g, '');
    return numericString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleAddTransaction = () => {
    setModalState({
      isOpen: true,
      type: 'add',
      transaction: null,
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      transaction: null,
    });
  };

  const hasTransactions = transactions.length > 0;

  return (
    <div className="transaction-container">
      <TransactionHeader onAddTransaction={handleAddTransaction} />

      <main className="app-main">
        {!hasTransactions ? (
          <div className="empty-state">
            <img src="public/icons/danger-circle.svg" width="24" height="24" />
            <p>شما هنوز تراکنشی وارد نکرده‌اید.</p>
          </div>
        ) : (
          <>
            <div className="desktop-view">
              <TransactionTable formatAmount={formatAmount} />
            </div>
            <div className="mobile-view">
              {transactions.map(transaction => (
                <TransactionCard
                  key={transaction.id}
                  transactionId={transaction.id}
                  formatAmount={formatAmount}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {modalState.isOpen && <TransactionModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Transaction;
