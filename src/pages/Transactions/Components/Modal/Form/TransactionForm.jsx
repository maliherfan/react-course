import { useEffect, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';

import { useApp } from '../../../../../context/AppContext';
import { toEnglishNumbers } from '../../../../../utils/numberUtils';

import './TransactionForm.css';

const TransactionForm = () => {
  const {
    modalState,
    closeModal,
    addTransaction,
    updateTransaction,
    loading,
    error,
  } = useApp();
  const { type: modalType, transaction } = modalState;
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    type: 'outcome',
    description: '',
  });

  //empty or full form
  useEffect(() => {
    if (modalType === 'edit' && transaction) {
      // edit - full form

      const amount =
        transaction.income !== '' ? transaction.income : transaction.outcome;
      setFormData({
        date: transaction.date || '',
        amount: amount || '',
        type: transaction.income ? 'income' : 'outcome',
        description: transaction.description || '',
      });
    } else {
      // add - empty form
      setFormData({
        date: '',
        amount: '',
        type: 'outcome',
        description: '',
      });
    }
  }, [modalType, transaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date || !formData.amount || !formData.description) {
      alert('لطفا تمام فیلدهای ضروری را پر کنید');
      return;
    }

    try {
      const transactionData = {
        date: toEnglishNumbers(formData.date),
        income: formData.type === 'income' ? formData.amount : '',
        outcome: formData.type === 'outcome' ? formData.amount : '',
        description: formData.description,
      };

      if (modalType === 'edit' && transaction) {
        await updateTransaction(transaction.id, transactionData);
      } else {
        await addTransaction(transactionData);
      }
      closeModal();
    } catch (error) {
      console.error('Transaction submission error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      date: value?.format?.('YYYY/MM/DD') || '',
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-groups">
        {error && <div className="form-error-message">⚠️ {error}</div>}
        <div className="form-group">
          <label htmlFor="date">تاریخ</label>
          <div className="date-input-wrapper">
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              id="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              format="YYYY/MM/DD"
              disabled={loading}
              offsetY={-20}
              required
            />
            <img
              className="calendar-icon"
              src="/icons/calender.svg"
              alt="انتخاب تاریخ"
              width="24"
              height="24"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">مبلغ(تومان)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label>نوع تراکنش</label>
          <div className="type-selector">
            <input
              type="radio"
              name="type"
              value="income"
              checked={formData.type === 'income'}
              onChange={handleChange}
              disabled={loading}
            />
            <label className="type-option">
              <span className="type-label">درآمد</span>
            </label>

            <input
              type="radio"
              name="type"
              value="outcome"
              checked={formData.type === 'outcome'}
              onChange={handleChange}
              disabled={loading}
            />
            <label className="type-option">
              <span className="type-label">هزینه</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">شرح</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn-cancel"
          onClick={closeModal}
          disabled={loading}
        >
          انصراف
        </button>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              در حال ثبت...
            </>
          ) : modalType === 'edit' ? (
            'ثبت تغییرات'
          ) : (
            'ثبت تراکنش'
          )}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
