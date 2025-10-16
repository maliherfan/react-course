import React from 'react';
import "../styles/Transaction.css"

const TransactionTable = ({ transactions = [], onDeleteTransaction }) => {
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
              {transaction.income ? `+${transaction.income}` : ''}
            </td>
            <td className="outcome">
              {transaction.outcome ? `-${transaction.outcome}` : ''}
            </td>
            <td>{transaction.description || 'بدون شرح'}</td>
            <td className="actions-cell">
              <button
                className="delete-btn"
                onClick={() => onDeleteTransaction(transaction.id)}
                title="حذف تراکنش"
              >
                <i className="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
