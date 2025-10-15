import React from 'react';
import "../styles/Transaction.css"
import TransactionCard from './TransactionCard';

const MobileCards = ({ transactions = [], onDeleteTransaction }) => {
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  if (safeTransactions.length === 0) {
    return (
      <div className="empty-state">
        <i className="fas fa-exclamation-circle"></i>
        <p>شما هنوز تراکنشی وارد نکرده‌اید.</p>
      </div>
    );
  }

  return (
    <>
      {safeTransactions.map(transaction => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onDelete={onDeleteTransaction}
        />
      ))}
    </>
  );
};

export default MobileCards;