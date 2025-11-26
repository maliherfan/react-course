import React from 'react';
import { useApp } from '../../context/AppContext';
import TransactionTable from './Components/TransactionTable/TransactionTable';
import TransactionCard from './Components/TransactionCard/TransactionCard';
import TransactionModal from './Components/Modal/TransactionModal';
import TransactionHeader from './Components/TransactionHeader/TransactionHeader';
import EmptyState from '../../components/EmptyState/EmptyState';
import './Transaction.css';

const Transaction = () => {
  const { transactions, modalState } = useApp();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="transaction-container">
      <TransactionHeader />

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

      {modalState.isOpen && (
        <TransactionModal />
      )}
    </div>
  );
};

export default Transaction;
