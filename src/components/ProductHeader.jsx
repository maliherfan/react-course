import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/ProductHeader.css';

const ProductHeader = () => {
  const location = useLocation();

  return (
    <header className="product-header">
      <div className="logo-section">
        <img src="/logo.svg" alt="لوگو جیب تو" className="logo-icon" />
        <h1 className="logo-text">جیب تو</h1>
      </div>

      <nav className="navigation">
        <Link
          to="/dashboard"
          className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          داشبورد
        </Link>
        <Link
          to="/expenses"
          className={`nav-link ${location.pathname === '/expenses' ? 'active' : ''}`}
        >
          لیست هزینه‌ها
        </Link>
      </nav>
    </header>
  );
};

export default ProductHeader;
