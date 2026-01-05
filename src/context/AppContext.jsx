import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import useFetch from '../hooks/useFetch';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within <AppProvider>');
  }
  return context;
};

// const API_BASE_URL = 'http://localhost:3001/transactions';
// const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
// const MOCKAPI_URL = 'https://695bc4e41d8041d5eeb855d8.mockapi.io';
const baseURL = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${baseURL}/transactions`;

export const AppProvider = ({ children }) => {
  const { data, loading, error, fetcher } = useFetch(`${API_BASE_URL}`);

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
  });

  const [sortBy, setSortBy] = useState('date-desc');

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
  });

  const filterTransactions = useCallback((transactions, filters) => {
    return transactions.filter((transaction) => {
      if (filters.startDate && transaction.date) {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(filters.startDate);
        if (transactionDate < startDate) {
          return false;
        }
      }

      if (filters.endDate && transaction.date) {
        const transactionDate = new Date(transaction.date);
        const endDate = new Date(filters.endDate);
        if (transactionDate > endDate) {
          return false;
        }
      }

      return true;
    });
  }, []);

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

  const filteredAndSortedTransactions = useMemo(() => {
    const filtered = filterTransactions(data, filters);
    return sortTransactions(filtered, sortBy);
  }, [data, filters, sortBy]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredAndSortedTransactions.slice(startIndex, endIndex);
  }, [filteredAndSortedTransactions, pagination]);

  const totalPages = useMemo(() => {
    return Math.ceil(
      filteredAndSortedTransactions.length / pagination.itemsPerPage
    );
  }, [filteredAndSortedTransactions, pagination.itemsPerPage]);

  const changePage = useCallback(
    (pageNumber) => {
      if (pageNumber < 1 || pageNumber > totalPages) return;
      window.scrollTo({ top: 0, behavior: 'auto' });
      setPagination((prev) => ({ ...prev, currentPage: pageNumber }));
    },[totalPages]);

  const addTransaction = (transactionData) =>
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

  const deleteTransaction = (id) =>
    fetcher({
      url: `${API_BASE_URL}/${id}`,
      method: 'DELETE',
    });

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

  const openAddModal = () => setModalState(createModal('add'));
  const openEditModal = (transaction) =>
    setModalState(createModal('edit', transaction));
  const openDeleteModal = (transaction) =>
    setModalState(createModal('delete', transaction));
  const closeModal = () =>
    setModalState({ isOpen: false, type: null, transaction: null });

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const updateSortBy = (newSortBy) => {
    setSortBy(newSortBy);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const value = useMemo(
    () => ({
      transactions: data,
      filteredTransactions: filteredAndSortedTransactions,

      paginatedTransactions,
      pagination,
      totalPages,
      changePage,

      filters,
      sortBy,
      updateFilters,
      updateSortBy,

      loading,
      error,

      addTransaction,
      updateTransaction,
      deleteTransaction,

      modalState,
      openAddModal,
      openEditModal,
      openDeleteModal,
      closeModal,
    }),
    [
      data,
      filteredAndSortedTransactions,
      paginatedTransactions,
      pagination,
      totalPages,
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
