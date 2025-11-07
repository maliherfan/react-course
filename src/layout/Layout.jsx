import React from 'react';
import { Outlet } from 'react-router-dom';
import ProductHeader from '../components/ProductHeader/ProductHeader';
import './Layout.css';

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
