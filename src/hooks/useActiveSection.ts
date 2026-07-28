import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view so navigation can highlight it.
 */
export function useActiveSection(ids: string[], offset = 120) {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const onScroll = () => {
      let current = ids[0] ?? '';

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
      }

      const atBottom =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      if (atBottom) current = ids[ids.length - 1] ?? current;

      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, offset]);

  return active;
}