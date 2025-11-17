import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { mockTransactions } from '../constants/mockData';

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

const TransactionContext = createContext();

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  // get data from localstorage or use mockdata on loading state
  const getInitialState = () => {
    try {
      const savedData = localStorage.getItem('expenseTrackerData');
      const transactions = savedData ? JSON.parse(savedData) : mockTransactions;
      return { transactions };
    } catch (error) {
      console.error('Error loading initial data:', error);
      return { transactions: mockTransactions };
    }
  };

  const [state, dispatch] = useReducer(transactionReducer, getInitialState());
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'add', 'edit', 'delete'
    transaction: null
  });

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
    transactions: state.transactions,
    modalState,
    dispatch,
    setModalState
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;
