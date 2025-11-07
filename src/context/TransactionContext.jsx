import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  transactions: [],
};

const transactionReducer = (state = initialState, action) => {
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

    case 'TRANSACTION_EDIT':
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
