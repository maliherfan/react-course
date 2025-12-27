import { useMemo } from 'react';

import CompactFilterBar from '../../components/CompactFilterBar/CompactFilterBar';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useApp } from '../../context/AppContext';

import ExpensePieChart from './Components/ExpensePieChart/ExpensePieChart';
import MonthlyBarChart from './Components/MonthlyBarChart/MonthlyBarChart';
import MonthlyDataSection from './Components/MonthlyDataSection/MonthlyDataSection';
import SummarySection from './Components/SummarySection/SummarySection';

import './Dashboard.css';

const Dashboard = () => {
  const {
    transactions,
    filteredTransactions,
    filters,
    sortBy,
    updateFilters,
    updateSortBy,
  } = useApp();

  const hasTransactions = transactions.length > 0;
  const hasFilteredData = filteredTransactions.length > 0;

  const { totalIncome, totalExpense, balance, monthlyData } = useMemo(() => {
    const totals = { income: 0, expense: 0 };
    const monthlySums = {};
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

    filteredTransactions.forEach(transaction => {
      if (!transaction.date) {return;}

      if (
        transaction.income &&
        transaction.income !== '' &&
        transaction.income !== '0'
      ) {
        totals.income += parseFloat(transaction.income);
      }
      if (
        transaction.outcome &&
        transaction.outcome !== '' &&
        transaction.outcome !== '0'
      ) {
        totals.expense += parseFloat(transaction.outcome);
      }

      const [year, month] = transaction.date.split('/').map(Number);
      const monthKey = `${year}-${month}`;

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

      monthlySums[monthKey].balance =
        monthlySums[monthKey].income - monthlySums[monthKey].expense;
    });

    const sortedMonths = Object.values(monthlySums).sort((a, b) => {
      if (a.year !== b.year) {return a.year - b.year;}
      return a.month - b.month;
    });

    const recentMonths = sortedMonths.slice(-3);

    return {
      totalIncome: totals.income,
      totalExpense: totals.expense,
      balance: totals.income - totals.expense,
      monthlyData: recentMonths,
    };
  }, [filteredTransactions]);

  return (
    <div className="dashboard-container">
      {/* filter & sort part */}
      {hasTransactions && (
        <CompactFilterBar
          filters={filters}
          onFilterChange={updateFilters}
          sortBy={sortBy}
          onSortChange={updateSortBy}
        />
      )}

      {!hasTransactions ? (
        <div className="dashboard-empty-state">
          <EmptyState message="برای مشاهده آمار، اولین تراکنش خود را ثبت کنید." />
        </div>
      ) : !hasFilteredData ? (
        <div className="dashboard-empty-state">
          <EmptyState message="هیچ تراکنشی با فیلترهای انتخابی یافت نشد." />
        </div>
      ) : (
        <>
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

          <div className="monthly-data-section">
            <MonthlyDataSection monthlyData={monthlyData} />
          </div>

          <div className="charts-section">
            <MonthlyBarChart data={monthlyData} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
