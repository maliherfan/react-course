import { Outlet } from 'react-router-dom';

import { AppProvider } from '../../context/AppContext';

const AppProviderWrapper = () => {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
};

export default AppProviderWrapper;
