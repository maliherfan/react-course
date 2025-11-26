import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';

const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        transactions: [action.payload, ...state.transactions],
      };

    case 'DELETE_TRANSACTION':
      return {
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.payload
        ),
      };

    case 'EDIT_TRANSACTION':
      const { id, updatedData } = action.payload;
      return {
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

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // get data from localstorage or use mockdata on loading state
  const getInitialState = () => {
    try {
      const savedData = localStorage.getItem('expenseTrackerData');
      const transactions = savedData ? JSON.parse(savedData) : [];
      return { transactions };
    } catch (error) {
      console.error('Error loading initial data:', error);
      return { transactions: [] };
    }
  };

  // transaction part
  const [state, dispatch] = useReducer(transactionReducer, getInitialState());
  // modal part
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

  // update localStorage whenever transaction list change
  useEffect(() => {
    try {
      localStorage.setItem(
        'expenseTrackerData',
        JSON.stringify(state.transactions)
      );
    } catch (error) {
      console.error('Error saving transactions:', error);
    }
  }, [state.transactions]);

  const value = {
    //transaction
    transactions: state.transactions,
    dispatch,
    //modal
    modalState,
    openAddModal,
    openEditModal,
    openDeleteModal,
    closeModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
