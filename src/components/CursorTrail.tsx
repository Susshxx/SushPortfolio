import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const TRAIL = [
{ size: 8, stiffness: 900, damping: 26, opacity: 1 },
{ size: 7, stiffness: 520, damping: 24, opacity: 0.8 },
{ size: 6, stiffness: 380, damping: 22, opacity: 0.65 },
{ size: 5, stiffness: 290, damping: 21, opacity: 0.5 },
{ size: 4, stiffness: 220, damping: 20, opacity: 0.38 },
{ size: 3, stiffness: 170, damping: 19, opacity: 0.28 },
{ size: 2, stiffness: 130, damping: 18, opacity: 0.2 },
{ size: 1, stiffness: 100, damping: 17, opacity: 0.12 }];


function TrailDot({
  x,
  y,
  size,
  stiffness,
  damping,
  opacity







}: {x: ReturnType<typeof useMotionValue<number>>;y: ReturnType<typeof useMotionValue<number>>;size: number;stiffness: number;damping: number;opacity: number;}) {
  const sx = useSpring(x, { stiffness, damping, mass: 0.3 });
  const sy = useSpring(y, { stiffness, damping, mass: 0.3 });

  return (
    <motion.span
      aria-hidden="true"
      className="fixed left-0 top-0 rounded-full bg-accent"
      style={{
        x: sx,
        y: sy,
        width: size,
        height: size,
        opacity,
        translateX: '-50%',
        translateY: '-50%'
      }} />);


}

export function CursorTrail() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      {[...TRAIL].reverse().map((dot, i) =>
      <TrailDot key={i} x={x} y={y} {...dot} />
      )}
    </div>);

}