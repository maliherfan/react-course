import React from 'react';
import AddTransactionForm from './Form/AddTransactionForm';
import './TransactionModal.css';

const TransactionModal = ({ onClose, onAddTransaction }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="line"></div>
        <div className="modal-header">
          <h2>افزودن تراکنش</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <AddTransactionForm
          onAddTransaction={onAddTransaction}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default TransactionModal;
