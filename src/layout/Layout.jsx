import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import ProductHeader from '../components/ProductHeader/ProductHeader';

import './Layout.css';
import Loading from '../components/Loading/Loading';
import { useEffect, useState } from 'react';

const Layout = () => {
  const { isAuthenticated } = useAuth();
  //  const [checkingAuth, setCheckingAuth] = useState(true);

  // useEffect(() => {    
  //   const savedAuth = localStorage.getItem('isAuthenticated') === 'true';
  //   if (!savedAuth) {
  //     return;
  //   }
  //   setCheckingAuth(false);
  // }, []);

  // if (checkingAuth) {
  //   return <Loading message="در حال بررسی وضعیت ورود..." />;
  // }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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
