import { useState } from 'react';

import { useApp } from '../../../../context/AppContext';

import TransactionForm from './Form/TransactionForm';

import './TransactionModal.css';

const TransactionModal = () => {
  const { modalState, closeModal, deleteTransaction, loading } = useApp();
  const { type: modalType, transaction } = modalState;
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleDelete = async () => {
    setErrorMessage('');
    try {
      await deleteTransaction(transaction.id);
      closeModal();
    } catch {
      setErrorMessage('❌ خطا در حذف تراکنش. لطفاً دوباره تلاش کنید.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="line"></div>
        <div className="modal-header">
          <h2>{getTitle()}</h2>
          <button className="close-btn" onClick={closeModal} disabled={loading}>
            <img src="/icons/close.svg" width="16" height="16" />
          </button>
        </div>
        {modalType === 'delete' ? (
          <div className="delete-content">
            <p className="delete-question">از حذف تراکنش اطمینان دارید؟</p>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={closeModal}
                disabled={loading}
              >
                انصراف
              </button>
              <button
                type="button"
                className="btn-delete"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    در حال حذف...
                  </>
                ) : (
                  'حذف'
                )}
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
