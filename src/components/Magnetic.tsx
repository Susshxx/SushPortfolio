import React, { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

type MagneticProps = {
  children: React.ReactNode;
  /** How strongly the element is pulled toward the cursor (0–1). */
  strength?: number;
  /** Extra distance around the element where the pull begins, in px. */
  radius?: number;
  className?: string;
};

export function Magnetic({ children, strength = 0.3, radius = 70, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 240, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 240, damping: 16, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);

      const near = Math.abs(dx) < rect.width / 2 + radius && Math.abs(dy) < rect.height / 2 + radius;

      x.set(near ? dx * strength : 0);
      y.set(near ? dy * strength : 0);
    };

    const reset = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', reset);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', reset);
    };
  }, [radius, strength, x, y]);

  return (
    <motion.span ref={ref} style={{ x, y }} className={`inline-block ${className ?? ''}`}>
      {children}
    </motion.span>);

}