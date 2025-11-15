import React, { useMemo } from 'react';
import { useTransaction } from '../../context/TransactionContext';
import './Dashboard.css';

const Dashboard = () => {
  const { transactions } = useTransaction();

  const parseAmount = amount => {
    if (!amount) return 0;

    if (typeof amount === 'string') {
      const cleanString = amount.replace(/,/g, '').trim();
      const parsed = parseFloat(cleanString);
      return isNaN(parsed) ? 0 : parsed;
    }

    return typeof amount === 'number' ? amount : 0;
  };

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.income && t.income !== '' && t.income !== '0')
      .reduce((sum, t) => sum + parseAmount(t.income), 0);

    const totalExpense = transactions
      .filter(t => t.outcome && t.outcome !== '' && t.outcome !== '0')
      .reduce((sum, t) => sum + parseAmount(t.outcome), 0);

    const balance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  }, [transactions]);

  const formatCurrency = amount => {
    return amount.toLocaleString('fa-IR') + ' ريال';
  };

  // conditional rendering for empty state
  if (transactions.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="empty-state">
          <h3>هنوز تراکنشی ثبت نکرده‌اید</h3>
          <p>برای مشاهده آمار، اولین تراکنش خود را ثبت کنید.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="summary-section">
        <div className="summary-card">
          <h3>کل درآمد</h3>
          <p className="amount income">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="summary-card">
          <h3>کل هزینه</h3>
          <p className="amount expense">{formatCurrency(totalExpense)}</p>
        </div>
        <div className="summary-card">
          <h3>تراز نهایی</h3>
          <p className={`amount ${balance >= 0 ? 'income' : 'expense'}`}>
            {formatCurrency(Math.abs(balance))}
          </p>
          <span className="balance-status">{balance >= 0 ? 'سود' : 'ضرر'}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
