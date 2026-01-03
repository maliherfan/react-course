import { useApp } from '../../../../context/AppContext';

import './TransactionCard.css';
import '../../Transaction.css';

const TransactionCard = ({ transactionId }) => {
  const { paginatedTransactions, openEditModal, openDeleteModal } = useApp();

  const transaction = paginatedTransactions.find((t) => t.id === transactionId);

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
            <span className="income">
              {Number(transaction.income).toLocaleString('fa-IR')}+ تومان
            </span>
          ) : (
            <span className="outcome">
              {Number(transaction.outcome).toLocaleString('fa-IR')}- تومان
            </span>
          )}
        </div>
      </div>

      <div className="card-description-action">
        <span>{transaction.description || 'بدون شرح'}</span>
        <div className="dropdown">
          <button className="dropdown-toggle">
            <img src="/icons/dot.svg" width="24" height="24" />
          </button>
          <div className="dropdown-menu">
            <button
              className="dropdown-item"
              onClick={() => openEditModal(transaction)}
            >
              <img src="/icons/edit.svg" width="16" height="16" />
              ویرایش
            </button>
            <button
              className="dropdown-item"
              onClick={() => openDeleteModal(transaction)}
            >
              <img src="/icons/trash.svg" width="16" height="16" />
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
