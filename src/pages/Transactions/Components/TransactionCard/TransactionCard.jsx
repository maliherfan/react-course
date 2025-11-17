import React from 'react';
import { useTransaction } from '../../../../context/TransactionContext';
import '../../Transaction.css';

const TransactionCard = ({ transactionId, formatAmount }) => {
  const { transactions, setModalState } = useTransaction();

  const transaction = transactions.find(t => t.id === transactionId);

  if (!transaction) {
    return null;
  }

  const handleEdit = () => {
    setModalState({
      isOpen: true,
      type: 'edit',
      transaction: transaction,
    });
  };

  const handleDelete = () => {
    setModalState({
      isOpen: true,
      type: 'delete',
      transaction: transaction,
    });
  };

  return (
    <div className="transaction-card">
      <div className="card-body">
        <span className="transaction-date">
          {transaction.date || 'تاریخ نامعلوم'}
        </span>
        <div className="transaction-amount">
          {transaction.income ? (
            <span className="income">
              {formatAmount(transaction.income)}+ تومان
            </span>
          ) : (
            <span className="outcome">
              {formatAmount(transaction.outcome)}- تومان
            </span>
          )}
        </div>
      </div>

      <div className="card-description-action">
        <span>{transaction.description || 'بدون شرح'}</span>
        <div className="dropdown">
          <button className="dropdown-toggle">
            <img src="public/icons/dot.svg" width="24" height="24" />
          </button>
          <div className="dropdown-menu">
            <button className="dropdown-item edit-btn" onClick={handleEdit}>
              <img src="public/icons/edit.svg" width="16" height="16" />
              ویرایش
            </button>
            <button className="dropdown-item delete-btn" onClick={handleDelete}>
              <img src="public/icons/trash.svg" width="16" height="16" />
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
