import React from 'react';

const TransactionHeader = ({ onAddTransaction }) => {
  return (
    <header className="app-header">
      <h1>تراکنش‌ها</h1>
      <button
        className="add-transaction-btn"
        onClick={onAddTransaction}
      >
        <span className="plus">+</span> افزودن تراکنش
      </button>
    </header>
  );
};

export default TransactionHeader;