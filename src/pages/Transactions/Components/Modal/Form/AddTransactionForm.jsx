import React, { useState, useEffect } from 'react';
import { useTransaction } from '../../../../../context/TransactionContext';
import './AddTransactionForm.css';

const AddTransactionForm = ({ onClose }) => {
  const { modalState, dispatch } = useTransaction();
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

      const amount = transaction.income !== '' ? transaction.income : transaction.outcome;
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

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.date || !formData.amount || !formData.description) {
      alert('لطفا تمام فیلدهای ضروری را پر کنید');
      return;
    }

    if (modalType === 'edit' && transaction) {
      dispatch({
        type: 'EDIT_TRANSACTION',
        payload: {
          id: transaction.id,
          updatedData: {
            id: transaction.id,
            date: formData.date,
            income: formData.type === 'income' ? formData.amount : '',
            outcome: formData.type === 'outcome' ? formData.amount : '',
            description: formData.description,
          },
        },
      });
    } else {
      const newTransaction = {
        id: Date.now(),
        date: formData.date,
        income: formData.type === 'income' ? formData.amount : '',
        outcome: formData.type === 'outcome' ? formData.amount : '',
        description: formData.description,
      };

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: newTransaction,
      });
    }

    onClose();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-groups">
        <div className="form-group">
          <label htmlFor="date">تاریخ</label>
          <div className="date-input-wrapper">
            <input
              type="text"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <img
              className="calendar-icon"
              src="public/icons/calender.svg"
              alt="انتخاب تاریخ"
              width="24"
              height="24"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">مبلغ(ریال)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
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
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>
          انصراف
        </button>
        <button type="submit" className="btn-submit">
          {modalType === 'edit' ? 'ثبت تغییرات' : 'ثبت'}
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
