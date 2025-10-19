import React from 'react';
import AddTransactionForm from './AddTransactionForm';
import '../styles/TransactionModal.css';

const TransactionModal = ({ onClose, onAddTransaction }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
