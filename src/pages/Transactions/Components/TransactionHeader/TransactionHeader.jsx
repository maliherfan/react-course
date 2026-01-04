import { useApp } from '../../../../context/AppContext';

import './TransactionHeader.css';

const TransactionHeader = () => {
  const { openAddModal } = useApp();

  return (
    <header className="app-header">
      <h1>تراکنش‌ها</h1>
      <button className="add-transaction-btn" onClick={openAddModal}>
        <img src="/icons/plus.svg" alt="افزودن تراکنش" width="24" height="24" />
        <span className="add-text">افزودن تراکنش</span>
      </button>
    </header>
  );
};

export default TransactionHeader;
