import { useEffect, useState } from 'react';
import { App } from './App';
import { AdminPage } from './pages/AdminPage';

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  // Route matching
  if (currentPath === '/admin' || currentPath === '/admin/') {
    return <AdminPage />;
  }

  return <App />;
}
