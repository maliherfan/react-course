import React from 'react';

const SummarySection = ({ totalIncome, totalExpense, balance }) => {
  return (
    <>
      <div className="summary-card">
        <h3>کل درآمد</h3>
        <p className="amount income">
          {totalIncome.toLocaleString('fa-IR') + ' ريال'}
        </p>
      </div>
      <div className="summary-card">
        <h3>کل هزینه</h3>
        <p className="amount expense">
          {totalExpense.toLocaleString('fa-IR') + ' ريال'}
        </p>
      </div>
      <div className="summary-card">
        <h3>تراز نهایی</h3>
        <p className={`amount ${balance >= 0 ? 'income' : 'expense'}`}>
          {Math.abs(balance).toLocaleString('fa-IR') + ' ريال'}
        </p>
        <span className="balance-status">{balance >= 0 ? 'سود' : 'ضرر'}</span>
      </div>
    </>
  );
};

export default SummarySection;
