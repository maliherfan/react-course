import React, { useMemo } from 'react';
import { useTransaction } from '../../context/TransactionContext';
import MonthlyBarChart from './Components/MonthlyBarChart/MonthlyBarChart';
import ExpensePieChart from './Components/ExpensePieChart/ExpensePieChart';
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

  const monthlyData = useMemo(() => {
    const monthlySums = {};

    transactions.forEach(transaction => {
      if (!transaction.date) return;

      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      // const monthName = `${transaction.date.split('/')[0]}/${transaction.date.split('/')[1]}`;
      const monthName = transaction.date.split('/')[1] * 1;
      const monthNames = [
        'فروردین',
        'اردیبهشت',
        'خرداد',
        'تیر',
        'مرداد',
        'شهریور',
        'مهر',
        'آبان',
        'آذر',
        'دی',
        'بهمن',
        'اسفند',
      ];
      if (!monthlySums[monthKey]) {
        monthlySums[monthKey] = {
          // name: monthName,
          name: monthNames[monthName - 1],
          income: 0,
          expense: 0,
          balance: 0,
        };
      }

      if (transaction.income) {
        monthlySums[monthKey].income += parseAmount(transaction.income);
      }
      if (transaction.outcome) {
        monthlySums[monthKey].expense += parseAmount(transaction.outcome);
      }

      monthlySums[monthKey].balance =
        monthlySums[monthKey].income - monthlySums[monthKey].expense;
    });

    return Object.values(monthlySums);
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

      <div className="charts-section">        
        <ExpensePieChart
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />
      </div>

      <div className="monthly-data-section">
        <h3>📊 داده‌های ماهانه </h3>
        <div className="monthly-data-grid">
          {monthlyData.map((month, index) => (
            <div key={index} className="month-data-card">
              <h4>{month.name}</h4>
              <div className="month-amounts">
                <div className="amount-row">
                  <span>درآمد:</span>
                  <span className="income">{formatCurrency(month.income)}</span>
                </div>
                <div className="amount-row">
                  <span>هزینه:</span>
                  <span className="expense">
                    {formatCurrency(month.expense)}
                  </span>
                </div>
                <div className="amount-row">
                  <span>تراز:</span>
                  <span className={month.balance >= 0 ? 'income' : 'expense'}>
                    {formatCurrency(Math.abs(month.balance))}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* charts */}
      <div className="charts-section">
        <MonthlyBarChart data={monthlyData} />
      </div>
    </div>
  );
};

export default Dashboard;
