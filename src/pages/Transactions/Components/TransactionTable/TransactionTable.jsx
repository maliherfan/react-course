import React from 'react';
import { useTransaction } from '../../../../context/TransactionContext';
import '../../Transaction.css';

const TransactionTable = ({ formatAmount }) => {
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
              {transaction.income ? `+${formatAmount(transaction.income)}` : ''}
            </td>
            <td className="outcome">
              {transaction.outcome
                ? `-${formatAmount(transaction.outcome)}`
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