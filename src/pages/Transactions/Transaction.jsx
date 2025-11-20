import React, { useState } from 'react';
import { useTransaction } from '../../context/TransactionContext';
import TransactionTable from './Components/TransactionTable/TransactionTable';
import TransactionCard from './Components/TransactionCard/TransactionCard';
import TransactionModal from './Components/Modal/TransactionModal';
import TransactionHeader from './Components/TransactionHeader/TransactionHeader';
import EmptyState from '../../components/EmptyState/EmptyState'
import './Transaction.css';

const Transaction = () => {
  const { transactions, modalState, setModalState } = useTransaction();

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
          <div className="transaction-empty-state">
            <EmptyState message="شما هنوز تراکنشی وارد نکرده‌اید." />
          </div>
        ) : (
          <>
            <div className="desktop-view">
              <TransactionTable />
            </div>
            <div className="mobile-view">
              {transactions.map(transaction => (
                <TransactionCard
                  key={transaction.id}
                  transactionId={transaction.id} 
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
