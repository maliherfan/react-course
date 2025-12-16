import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import useFetch from '../hooks/useFetch';

// context part
const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const API_BASE_URL = 'http://localhost:3001/transactions';

// context provider
export const AppProvider = ({ children }) => {
  // just call once whenever component mounts
  // first loading of data & get fetcher for future CRUD actions
  const { data, loading, error, fetcher } = useFetch(`${API_BASE_URL}`);

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
  });

  const [sortBy, setSortBy] = useState('date-desc');

  // without filter
  const sortedTransactions = useMemo(() => {
    return [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [data]);

  // filter based on date
  const filterTransactions = useCallback((transactions, filters) => {
    return transactions.filter(transaction => {
      if (filters.startDate && transaction.date) {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(filters.startDate);
        if (transactionDate < startDate) return false;
      }

      if (filters.endDate && transaction.date) {
        const transactionDate = new Date(transaction.date);
        const endDate = new Date(filters.endDate);
        if (transactionDate > endDate) return false;
      }

      return true;
    });
  }, []);

  // sorting
  const sortTransactions = useCallback((transactions, sortBy) => {
    return [...transactions].sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'income-desc': {
          const incomeA = parseFloat(a.income || 0);
          const incomeB = parseFloat(b.income || 0);
          return incomeB - incomeA;
        }
        case 'income-asc': {
          const incomeA = parseFloat(a.income || 0);
          const incomeB = parseFloat(b.income || 0);
          return incomeA - incomeB;
        }
        case 'outcome-desc': {
          const outcomeA = parseFloat(a.outcome || 0);
          const outcomeB = parseFloat(b.outcome || 0);
          return outcomeB - outcomeA;
        }
        case 'outcome-asc': {
          const outcomeA = parseFloat(a.outcome || 0);
          const outcomeB = parseFloat(b.outcome || 0);
          return outcomeA - outcomeB;
        }
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });
  }, []);

  // Derived State:sort and filtered
  const filteredAndSortedTransactions = useMemo(() => {
    const filtered = filterTransactions(sortedTransactions, filters);
    return sortTransactions(filtered, sortBy);
  }, [
    sortedTransactions,
    filters,
    sortBy,
    filterTransactions,
    sortTransactions,
  ]);

  // CRUD operations
  const addTransaction = transactionData =>
    fetcher({
      url: API_BASE_URL,
      method: 'POST',
      body: transactionData,
    });

  const updateTransaction = (id, updatedData) =>
    fetcher({
      url: `${API_BASE_URL}/${id}`,
      method: 'PUT',
      body: { id, ...updatedData },
    });

  const deleteTransaction = id =>
    fetcher({
      url: `${API_BASE_URL}/${id}`,
      method: 'DELETE',
    });

  // modal management
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    transaction: null,
  });

  const createModal = (type, transaction = null) => ({
    isOpen: true,
    type,
    transaction,
  });

  // modal functions
  const openAddModal = () => setModalState(createModal('add'));
  const openEditModal = transaction =>
    setModalState(createModal('edit', transaction));
  const openDeleteModal = transaction =>
    setModalState(createModal('delete', transaction));
  const closeModal = () =>
    setModalState({ isOpen: false, type: null, transaction: null });

  const updateFilters = newFilters => {
    setFilters(newFilters);
  };

  const updateSortBy = newSortBy => {
    setSortBy(newSortBy);
  };

  const value = useMemo(
    () => ({
      // data
      transactions: sortedTransactions,
      filteredTransactions: filteredAndSortedTransactions,

      // filter & sort
      filters,
      sortBy,

      // functions
      updateFilters,
      updateSortBy,

      // status
      loading,
      error,

      // CRUD
      addTransaction,
      updateTransaction,
      deleteTransaction,

      // modal
      modalState,
      openAddModal,
      openEditModal,
      openDeleteModal,
      closeModal,
    }),
    [
      sortedTransactions,
      filteredAndSortedTransactions,
      filters,
      sortBy,
      loading,
      error,
      modalState,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
