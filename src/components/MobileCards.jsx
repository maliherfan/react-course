import React from 'react';

const MobileCards = ({transactions}) => {
  return (
    <div className="mobile-cards-container">
      {transactions.map(transaction => (
        <div key={transaction.id} className="transaction-card">
          <div className="card-body">
            <span className="transaction-date">{transaction.date || 'تاریخ نامعلوم'}</span>
            <div className="transaction-amount">
              {transaction.income ? (
                <span className="income">{transaction.income}+ تومان</span>
              ) : (
                <span className="outcome">{transaction.outcome}- تومان</span>
              )}
            </div>
          </div>

          <div className="card-description">{transaction.description || 'بدون شرح'}</div>
        </div>
      ))}
    </div>
  );
};

export default MobileCards;
