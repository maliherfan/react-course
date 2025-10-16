import React from 'react';
import "../styles/Transaction.css"
import TransactionCard from './TransactionCard';

const MobileCards = ({ transactions = [], onDeleteTransaction }) => {
  return (
    <>
      {transactions.map(transaction => (
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