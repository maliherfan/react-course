import React from 'react';
import { useTransaction } from '../../../../context/TransactionContext';
import "../../Transaction.css"

const TransactionCard = ({ transactionId, formatAmount }) => {
  const { transactions, dispatch } = useTransaction();

  const transaction = transactions.find(t => t.id === transactionId);

  if (!transaction) {
    return null;
  }

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
          onClick={() => dispatch({ 
            type: 'DELETE_TRANSACTION', 
            payload: transactionId 
          })}
          title="حذف تراکنش"
        >
          <img src="public/icons/trash.svg" width="24" height="24" />
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;