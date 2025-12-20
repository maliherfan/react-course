import CompactFilterBar from '../../components/CompactFilterBar/CompactFilterBar';
import EmptyState from '../../components/EmptyState/EmptyState';
import Pagination from './Components/Pagination/Pagination';
import { useApp } from '../../context/AppContext';

import TransactionModal from './Components/Modal/TransactionModal';
import TransactionCard from './Components/TransactionCard/TransactionCard';
import TransactionHeader from './Components/TransactionHeader/TransactionHeader';
import TransactionTable from './Components/TransactionTable/TransactionTable';

import './Transaction.css';

const Transaction = () => {
  const {
    transactions,
    filteredTransactions,
    modalState,
    filters,
    sortBy,
    updateFilters,
    updateSortBy,
  } = useApp();

  const hasTransactions = transactions.length > 0;
  const hasFilteredResults = filteredTransactions.length > 0;

  return (
    <div className="transaction-container">
      <TransactionHeader />

      {/* filter & sort part */}
      {hasTransactions && (
        <CompactFilterBar
          filters={filters}
          onFilterChange={updateFilters}
          sortBy={sortBy}
          onSortChange={updateSortBy}
        />
      )}

      <main className="app-main">
        {!hasTransactions ? (
          <div className="transaction-empty-state">
            <EmptyState message="شما هنوز تراکنشی وارد نکرده‌اید." />
          </div>
        ) : !hasFilteredResults ? (
          <div className="transaction-empty-state">
            <EmptyState message="هیچ تراکنشی با فیلترهای انتخابی یافت نشد." />
          </div>
        ) : (
          <>
            <div className="desktop-view">
              <TransactionTable />
            </div>
            <div className="mobile-view">
              {filteredTransactions.map(transaction => (
                <TransactionCard
                  key={transaction.id}
                  transactionId={transaction.id}
                />
              ))}
            </div>
            <Pagination />
          </>
        )}
      </main>

      {modalState.isOpen && <TransactionModal />}
    </div>
  );
};

export default Transaction;
