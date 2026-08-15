import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 8 premium font styles
const fontVariants = [
  { fontFamily: 'serif', fontWeight: 400, fontStyle: 'italic' },
  { fontFamily: '"Brush Script MT", cursive', fontWeight: 400 },
  { fontFamily: 'Georgia, serif', fontWeight: 700 },
  { fontFamily: '"Trebuchet MS", sans-serif', fontWeight: 300 },
  { fontFamily: '"Palatino Linotype", serif', fontWeight: 600, fontStyle: 'italic' },
  { fontFamily: '"Courier New", monospace', fontWeight: 700 },
  { fontFamily: '"Times New Roman", serif', fontWeight: 400 },
  { fontFamily: 'Impact, sans-serif', fontWeight: 400, letterSpacing: '0.02em' }
];

export function WelcomeScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Always show welcome screen on start
    // Cycle through fonts
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= fontVariants.length - 1) {
          clearInterval(interval);
          // Hold on last font for a moment before fading out
          setTimeout(() => {
            setIsVisible(false);
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 350); // Change font every 350ms

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-surface">
          
          <h1
            className="text-3xl text-ink sm:text-4xl md:text-5xl"
            style={fontVariants[currentIndex]}>
            Sushanta.M
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

