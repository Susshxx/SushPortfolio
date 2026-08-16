import { useEffect, useMemo, useState, useRef } from 'react';
import { DownloadIcon, MenuIcon, XIcon } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV_LINKS = [
{ label: 'About', id: 'about' },
{ label: 'Skills', id: 'skills' },
{ label: 'Projects', id: 'projects' },
{ label: 'Education', id: 'education' },
{ label: 'Contact', id: 'contact' }];

type HeaderProps = {
  onOpenAdminPanel: () => void;
};

function ActiveUsersCounter() {
  const [activeUsers, setActiveUsers] = useState(1);

  useEffect(() => {
    // Simulate active users count (in production, this would use Firebase Realtime Database)
    const updateCount = () => {
      // Generate a realistic number between 1-5
      const count = Math.floor(Math.random() * 5) + 1;
      setActiveUsers(count);
    };

    updateCount();
    const interval = setInterval(updateCount, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <div className="relative">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </div>
      <span>{activeUsers} user{activeUsers !== 1 ? 's' : ''} visiting</span>
    </div>
  );
}

export function Header({ onOpenAdminPanel }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const ids = useMemo(() => NAV_LINKS.map((l) => l.id), []);
  const active = useActiveSection(ids);
  const longPressTimer = useRef<number | null>(null);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleMouseDown = () => {
    longPressTimer.current = window.setTimeout(() => {
      onOpenAdminPanel();
      setOpen(false);
    }, 1000);
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleTouchStart = () => {
    longPressTimer.current = window.setTimeout(() => {
      onOpenAdminPanel();
      setOpen(false);
    }, 1000);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleMenuClick = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setOpen((v) => !v);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[84px] w-full max-w-[1280px] items-center justify-between px-6 md:px-8">
        <a href="#hero" className="font-display text-2xl font-bold text-heading">
          Sushanta<span className="text-accent">.</span>M
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`text-base font-medium transition-colors relative z-10 ${
                isActive ? 'text-accent' : 'text-body hover:text-heading dark:hover:text-white'}`
                }>
                
                {link.label}
              </a>);

          })}
          <Magnetic>
            <a
              href="/Sushanta Marahatta CV.pdf"
              download
              className="flex items-center gap-2 rounded-full bg-heading px-5 py-2 text-base font-medium text-white">
              
              <DownloadIcon className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
          </Magnetic>
          <ActiveUsersCounter />
        </nav>

        <button
          type="button"
          onClick={handleMenuClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="rounded-lg border border-line p-2 text-heading md:hidden">
          
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open &&
      <nav className="border-t border-line bg-white px-6 py-4 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) =>
          <li key={link.id}>
                <a
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className={`text-base font-medium relative z-10 ${
              active === link.id ? 'text-accent' : 'text-body dark:hover:text-white'}`
              }>
              
                  {link.label}
                </a>
              </li>
          )}
            <li>
              <a
                href="/Sushanta Marahatta CV.pdf"
                download
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded bg-black px-4 py-2 text-base font-medium text-white">
                
                <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </a>
            </li>
            <li>
              <ActiveUsersCounter />
            </li>
          </ul>
        </nav>
      }
    </header>);

}