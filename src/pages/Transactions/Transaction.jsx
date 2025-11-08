import React, { useState } from 'react';
import { useTransaction } from '../contexts/TransactionContext';
import TransactionTable from './TransactionTable';
import TransactionCard from './TransactionCard';
import TransactionModal from './TransactionModal';
import TransactionHeader from './TransactionHeader';
import '../styles/Transaction.css';

const Transaction = () => {
  const { transactions } = useTransaction();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatAmount = amount => {
    if (!amount) return '';
    const numericString = amount.toString().replace(/[^\d]/g, '');
    return numericString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const hasTransactions = transactions.length > 0;

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

      {isModalOpen && (
        <TransactionModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Transaction;