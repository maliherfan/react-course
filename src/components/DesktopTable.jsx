import React from 'react';

const DesktopTable = ({ transactions }) => {
  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>تاریخ</th>
          <th>درآمد (تومان)</th>
          <th>هزینه (تومان)</th>
          <th>شرح</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DesktopTable;
