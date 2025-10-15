import React from 'react';
import TransactionTable from './TransactionTable';
import MobileCards from './MobileCards';
import '../styles/Transaction.css';

const Transaction = ({ transactions = [], onDeleteTransaction }) => {
  return (
    <>
      <div className="desktop-view">
        <TransactionTable
          transactions={transactions}
          onDeleteTransaction={onDeleteTransaction}
        />
      </div>
      <div className="mobile-view">
        <MobileCards
          transactions={transactions}
          onDeleteTransaction={onDeleteTransaction}
        />
      </div>
    </>
  );
};

export default Transaction;
