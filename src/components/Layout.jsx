import React from 'react';
import { Outlet } from 'react-router-dom';
import ProductHeader from './product-header';

const Layout = () => {
  return (
    <>
      <ProductHeader />
      <Outlet />
    </>
  );
};

export default Layout;
