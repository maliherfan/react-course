import React from 'react';
import { useApp } from '../../../../context/AppContext';
import TransactionForm from './Form/TransactionForm';
import './TransactionModal.css';

const TransactionModal = () => {
  const { modalState, closeModal, dispatch } = useApp();
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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="line"></div>
        <div className="modal-header">
          <h2>{getTitle()}</h2>
          <button className="close-btn" onClick={closeModal}>
            <img src="public/icons/close.svg" width="16" height="16" />
          </button>
        </div>
        {modalType === 'delete' ? (
          <div className="delete-content">
            <p className="delete-question">از حذف تراکنش اطمینان دارید؟</p>
            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={closeModal}>
                انصراف
              </button>
              <button
                type="button"
                className="btn-delete"
                onClick={() => {
                  dispatch({
                    type: 'DELETE_TRANSACTION',
                    payload: transaction.id,
                  });
                  closeModal();
                }}
              >
                حذف
              </button>
            </div>
          </div>
        ) : (
          <TransactionForm />
        )}
      </div>
    </div>
  );
};

export default TransactionModal;
