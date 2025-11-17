import React from 'react';
import { useTransaction } from '../../../../context/TransactionContext';
import AddTransactionForm from './Form/AddTransactionForm';
import './TransactionModal.css';

const TransactionModal = ({ onClose }) => {
  const { modalState, dispatch } = useTransaction();
  const { type: modalType, transaction } = modalState;

  const getTitle = () => {
    switch (modalType) {
      case 'add':
        return 'افزودن تراکنش';
      case 'edit':
        return 'ویرایش تراکنش';
      case 'delete':
        return 'حذف تراکنش';
      default:
        return '';
    }
  };

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: transaction.id,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="line"></div>
        <div className="modal-header">
          <h2>{getTitle()}</h2>
          <button className="close-btn" onClick={onClose}>
            <img src="public/icons/close.svg" width="16" height="16" />
          </button>
        </div>
        {modalType === 'delete' ? (
          <div className="delete-content">
            <p className="delete-question">از حذف تراکنش اطمینان دارید؟</p>
            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                انصراف
              </button>
              <button
                type="button"
                className="btn-delete"
                onClick={handleDelete}
              >
                حذف
              </button>
            </div>
          </div>
        ) : (
          <AddTransactionForm onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default TransactionModal;
