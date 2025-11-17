import React from 'react';
import { useTransaction } from '../../../../context/TransactionContext';
import '../../Transaction.css';

const TransactionTable = ({ formatAmount }) => {
  const { transactions, setModalState } = useTransaction();

  const handleEdit = transaction => {
    setModalState({
      isOpen: true,
      type: 'edit',
      transaction: transaction,
    });
  };

  const handleDelete = transaction => {
    setModalState({
      isOpen: true,
      type: 'delete',
      transaction: transaction,
    });
  };

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>تاریخ</th>
          <th>درآمد (تومان)</th>
          <th>هزینه (تومان)</th>
          <th>شرح</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.date || 'تاریخ نامعلوم'}</td>
            <td className="income">
              {transaction.income ? `+${formatAmount(transaction.income)}` : ''}
            </td>
            <td className="outcome">
              {transaction.outcome
                ? `-${formatAmount(transaction.outcome)}`
                : ''}
            </td>
            <td>{transaction.description || 'بدون شرح'}</td>
            <td className="actions-cell">
              <div className="dropdown">
                <button className="dropdown-toggle">
                  <img src="public/icons/dot.svg" width="24" height="24" />
                </button>
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item edit-btn"
                    onClick={() => handleEdit(transaction)}
                  >
                    <img src="public/icons/edit.svg" width="16" height="16" />
                    ویرایش
                  </button>
                  <button
                    className="dropdown-item delete-btn"
                    onClick={() => handleDelete(transaction)}
                  >
                    <img src="public/icons/trash.svg" width="16" height="16" />
                    حذف
                  </button>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
