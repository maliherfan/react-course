import React from 'react';
import { Outlet } from 'react-router-dom';
import ProductHeader from './product-header';
import '../styles/Layout.css';

const Layout = () => {
  return (
    <>
      <ProductHeader />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;