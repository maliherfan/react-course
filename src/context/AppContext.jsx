import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Api from '../services/Api';

//reducer - state management
const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'SET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        error: null,
        transactions: action.payload,
      };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        loading: false,
        error: null,
        transactions: [action.payload, ...state.transactions],
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        loading: false,
        error: null,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.payload
        ),
      };

    case 'EDIT_TRANSACTION':
      const { id, updatedData } = action.payload;
      return {
        ...state,
        loading: false,
        error: null,
        transactions: state.transactions.map(transaction =>
          transaction.id === id
            ? { ...transaction, ...updatedData }
            : transaction
        ),
      };

    default:
      return state;
  }
};

//context part
const AppContext = createContext();
export const useApp = () => useContext(AppContext);

//context provider
export const AppProvider = ({ children }) => {
  const initialState = {
    transactions: [],
    loading: false,
    error: null,
  };

  // transaction state management
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  // remove error after 5 seconds
  useEffect(() => {
    if (state.error) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_ERROR', payload: null });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.error]);

  //helper for async actions
  const asyncAction = async (requestFn, onSuccess) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const result = await requestFn();
      onSuccess(result);
      return result;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  // API actions
  const loadTransactions = () =>
    asyncAction(Api.fetchTransactions, data =>
      dispatch({ type: 'SET_TRANSACTIONS', payload: data })
    );

  const addTransaction = data =>
    asyncAction(
      () => Api.addTransaction(data),
      newTx => dispatch({ type: 'ADD_TRANSACTION', payload: newTx })
    );

  const updateTransaction = (id, updated) =>
    asyncAction(
      () => Api.updateTransaction(id, updated),
      updatedTx =>
        dispatch({
          type: 'EDIT_TRANSACTION',
          payload: { id, updatedData: updatedTx },
        })
    );

  const deleteTransaction = id =>
    asyncAction(
      () => Api.deleteTransaction(id),
      () => dispatch({ type: 'DELETE_TRANSACTION', payload: id })
    );

  // first loading data from API
  useEffect(() => {
    loadTransactions();
  }, []);

  // modal management
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    transaction: null,
  });
  // modal functions
  const openAddModal = () => {
    setModalState({
      isOpen: true,
      type: 'add',
      transaction: null,
    });
  };

  const openEditModal = transaction => {
    setModalState({
      isOpen: true,
      type: 'edit',
      transaction,
    });
  };

  const openDeleteModal = transaction => {
    setModalState({
      isOpen: true,
      type: 'delete',
      transaction,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      transaction: null,
    });
  };

  const value = useMemo(
    () => ({
      transactions: state.transactions,
      loading: state.loading,
      error: state.error,

      loadTransactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,

      modalState,
      openAddModal,
      openEditModal,
      openDeleteModal,
      closeModal,
    }),
    [state, modalState]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
