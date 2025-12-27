import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import ProductHeader from '../components/ProductHeader/ProductHeader';

import './Layout.css';

const Layout = () => {
  const { isAuthenticated } = useAuth();

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
