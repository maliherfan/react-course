import React from 'react';
import "../styles/Transaction.css"

const TransactionCard = ({ transaction, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`آیا از حذف تراکنش "${transaction.description}" مطمئن هستید؟`)) {
      onDelete(transaction.id);
    }
  };

  return (
    <div className="transaction-card">
      <div className="card-body">
        <span className="transaction-date">
          {transaction.date || 'تاریخ نامعلوم'}
        </span>
        <div className="transaction-amount">
          {transaction.income ? (
            <span className="income">{transaction.income}+ تومان</span>
          ) : (
            <span className="outcome">{transaction.outcome}- تومان</span>
          )}
        </div>
      </div>

      <div className="card-description-action">
        <span>{transaction.description || 'بدون شرح'}</span>
        <button
          className="delete-btn"
          onClick={handleDelete}
          title="حذف تراکنش"
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;
