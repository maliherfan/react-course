import React from 'react';
import DesktopTable from './DesktopTable';
import MobileCards from './MobileCards';
import './TransactionTable.css';

const TransactionTable = ({ transactions }) => {
  return (
    <div className="transaction-container">
      <div className="desktop-view">
        <DesktopTable transactions={transactions} />
      </div>
      <div className="mobile-view">
        <MobileCards transactions={transactions} />
      </div>
    </div>
  );
};

export default TransactionTable;
