import { useEffect, useState } from 'react';
import { App } from './App';
import { AdminPage } from './pages/AdminPage';

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname);
    };

    // Handle browser back/forward
    window.addEventListener('popstate', handleNavigation);
    
    // Intercept link clicks for client-side routing
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href && anchor.origin === window.location.origin) {
        const href = anchor.getAttribute('href');
        if (href && (href.startsWith('/admin') || href === '/')) {
          e.preventDefault();
          window.history.pushState({}, '', href);
          setCurrentPath(href);
        }
      }
    };

    document.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('popstate', handleNavigation);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Route matching
  if (currentPath === '/admin' || currentPath === '/admin/') {
    return <AdminPage />;
  }

  return <App />;
}
