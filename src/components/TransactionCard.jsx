import React from 'react';
import "../styles/Transaction.css"

const TransactionCard = ({ transaction, onDelete, formatAmount}) => {
  return (
    <div className="transaction-card">
      <div className="card-body">
        <span className="transaction-date">
          {transaction.date || 'تاریخ نامعلوم'}
        </span>
        <div className="transaction-amount">
          {transaction.income ? (
            <span className="income">{formatAmount(transaction.income)}+ تومان</span>
          ) : (
            <span className="outcome">{formatAmount(transaction.outcome)}- تومان</span>
          )}
        </div>
      </div>

      <div className="card-description-action">
        <span>{transaction.description || 'بدون شرح'}</span>
        <button
          className="delete-btn"
          onClick={() => onDelete(transaction.id)}
          title="حذف تراکنش"
        >
          <img src="public/icons/trash.svg" width="24" height="24" />
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;
