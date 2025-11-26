import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import MonthlyBarChart from './Components/MonthlyBarChart/MonthlyBarChart';
import ExpensePieChart from './Components/ExpensePieChart/ExpensePieChart';
import SummarySection from './Components/SummarySection/SummarySection';
import MonthlyDataSection from './Components/MonthlyDataSection/MonthlyDataSection';
import EmptyState from '../../components/EmptyState/EmptyState'
import { normalizeDate } from '../../utils/numberUtils';
import './Dashboard.css';

const Dashboard = () => {
  const { transactions } = useApp();

  const { totalIncome, totalExpense, balance, monthlyData } = useMemo(() => {
    const totals = { income: 0, expense: 0 };
    const monthlySums = {};
    const monthNames = [
      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
    ];

    transactions.forEach(transaction => {
      if (!transaction.date) return;

      // totall calculations
      if (transaction.income && transaction.income !== '' && transaction.income !== '0') {
        totals.income += parseFloat(transaction.income);
      }
      if (transaction.outcome && transaction.outcome !== '' && transaction.outcome !== '0') {
        totals.expense += parseFloat(transaction.outcome);
      }

      // monthly calculations
      const englishDate = normalizeDate(transaction.date);
      const [year, month] = englishDate.split('/').map(Number);
      const monthKey = `${year}-${month.toString().padStart(2, '0')}`;

      if (!monthlySums[monthKey]) {
        monthlySums[monthKey] = {
          key: monthKey,
          name: monthNames[month - 1],
          year: year,
          month: month,
          income: 0,
          expense: 0,
          balance: 0,
        };
      }

      if (transaction.income) {
        monthlySums[monthKey].income += parseFloat(transaction.income);
      }
      if (transaction.outcome) {
        monthlySums[monthKey].expense += parseFloat(transaction.outcome);
      }

      monthlySums[monthKey].balance = monthlySums[monthKey].income - monthlySums[monthKey].expense;
    });

    const sortedMonths = Object.values(monthlySums).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });

    const recentMonths = sortedMonths.slice(-3);

    return {
      totalIncome: totals.income,
      totalExpense: totals.expense,
      balance: totals.income - totals.expense,
      monthlyData: recentMonths
    };
  }, [transactions]);

  // conditional rendering for empty state
  if (transactions.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-empty-state">
          <EmptyState 
            message="برای مشاهده آمار، اولین تراکنش خود را ثبت کنید."
          /> 
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* totall data */}
      <div className="summary-section">
        <SummarySection
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          balance={balance}
        />
      </div>

      {/* totall chart */}
      <div className="charts-section">
        <ExpensePieChart
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />
      </div>

      {/* monthly data */}
      <div className="monthly-data-section">
        <MonthlyDataSection monthlyData={monthlyData} />
      </div>

      {/* monthly chart */}
      <div className="charts-section">
        <MonthlyBarChart data={monthlyData} />
      </div>
    </div>
  );
};

export default Dashboard;
