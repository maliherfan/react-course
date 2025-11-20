import React from 'react';

const MonthlyDataSection = ({ monthlyData }) => {
  return (
    <>
      <h3>📊 داده‌های ماهانه </h3>
      <div className="monthly-data-grid">
        {monthlyData.map((month, index) => (
          <div key={index} className="month-data-card">
            <h4>{month.name}</h4>
            <div className="month-amounts">
              <div className="amount-row">
                <span>درآمد:</span>
                <span className="income">
                  {month.income.toLocaleString('fa-IR') + ' ريال'}
                </span>
              </div>
              <div className="amount-row">
                <span>هزینه:</span>
                <span className="expense">
                  {month.expense.toLocaleString('fa-IR') + ' ريال'}
                </span>
              </div>
              <div className="amount-row">
                <span>تراز:</span>
                <span className={month.balance >= 0 ? 'income' : 'expense'}>
                  {Math.abs(month.balance).toLocaleString('fa-IR') + ' ريال'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MonthlyDataSection;