import React, { useMemo } from 'react';
import { useTransaction } from '../../context/TransactionContext';
import MonthlyBarChart from './Components/MonthlyBarChart/MonthlyBarChart';
import ExpensePieChart from './Components/ExpensePieChart/ExpensePieChart';
import SummarySection from './Components/SummarySection/SummarySection';
import MonthlyDataSection from './Components/MonthlyDataSection/MonthlyDataSection';
import EmptyState from '../../components/EmptyState/EmptyState'
import './Dashboard.css';

const Dashboard = () => {
  const { transactions } = useTransaction();

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.income && t.income !== '' && t.income !== '0')
      .reduce((sum, t) => sum + parseFloat(t.income), 0);

    const totalExpense = transactions
      .filter(t => t.outcome && t.outcome !== '' && t.outcome !== '0')
      .reduce((sum, t) => sum + parseFloat(t.outcome), 0);

    const balance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  }, [transactions]);

  const monthlyData = useMemo(() => {
    const monthlySums = {};

    transactions.forEach(transaction => {
      if (!transaction.date) return;

      const [year, month, day] = transaction.date.split('/').map(Number);
      const monthKey = `${year}-${month}`;
      console.log(monthKey);
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
          name: monthNames[month - 1],
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

      monthlySums[monthKey].balance =
        monthlySums[monthKey].income - monthlySums[monthKey].expense;
    });

    return Object.values(monthlySums);
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
