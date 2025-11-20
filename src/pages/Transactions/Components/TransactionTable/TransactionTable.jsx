import React from 'react';
import { useTransaction } from '../../../../context/TransactionContext';
import '../../Transaction.css';

const TransactionTable = () => {
  const { transactions, dispatch } = useTransaction();

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
              {transaction.income ? `+${Number(transaction.income).toLocaleString('fa-IR')}` : ''}
            </td>
            <td className="outcome">
              {transaction.outcome
                ? `-${Number(transaction.outcome).toLocaleString('fa-IR')}`
                : ''}
            </td>
            <td>{transaction.description || 'بدون شرح'}</td>
            <td className="actions-cell">
              <button
                className="delete-btn"
                onClick={() => dispatch({ 
                  type: 'DELETE_TRANSACTION', 
                  payload: transaction.id 
                })}
                title="حذف تراکنش"
              >
                <img src="public/icons/trash.svg" width="24" height="24" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;