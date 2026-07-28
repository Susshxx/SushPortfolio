import { useEffect, useState } from 'react';

type Options = {
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
};

export function useTypewriter(words: string[], options: Options = {}) {
  const { typeSpeed = 90, deleteSpeed = 45, pauseTime = 1600 } = options;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[index % words.length];

    if (!deleting && text === current) {
      const timeout = window.setTimeout(() => setDeleting(true), pauseTime);
      return () => window.clearTimeout(timeout);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const timeout = window.setTimeout(
      () => {
        setText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        );
      },
      deleting ? deleteSpeed : typeSpeed
    );

    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pauseTime]);

  return text;
}