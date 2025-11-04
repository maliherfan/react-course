import React from 'react';
import { Outlet } from 'react-router-dom';
import ProductHeader from './ProductHeader';
import '../styles/Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <header className="layout-header">
        <ProductHeader />
      </header>
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
