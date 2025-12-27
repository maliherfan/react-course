import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import './ProductHeader.css';

const ProductHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="product-header">
      <button className="logout-icon-btn" onClick={handleLogout} title="امکان خروج">
        <img src="/public/icons/logout.svg" alt="امکان خروج" width="24" height="24" />
      </button>

      <div className="header-right-section">
        <div className="logo-section">
          <img
            src="/public/icons/logo.svg"
            alt="لوگو جیب تو"
            className="logo-icon"
          />
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
      </div>
    </header>
  );
};

export default ProductHeader;
