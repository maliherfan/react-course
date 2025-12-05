import { createContext, useContext, useMemo, useState } from 'react';
import { normalizeDate } from '../utils/numberUtils';
import useFetch from '../hooks/useFetch';

//context part
const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const API_BASE_URL = 'http://localhost:3001/transactions';

//context provider
export const AppProvider = ({ children }) => {
  //just call once whenever component mounts
  const { data, loading, error, fetcher } = useFetch(`${API_BASE_URL}`);

  const sortedTransactions = useMemo(() => {
    return [...data].sort(
      (a, b) =>
        new Date(normalizeDate(b.date)) - new Date(normalizeDate(a.date))
    );
  }, [data]);

  //CRUD operations
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

  const value = useMemo(
    () => ({
      transactions: sortedTransactions,
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
    [sortedTransactions, loading, error, modalState]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
