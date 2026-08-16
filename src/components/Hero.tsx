import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, MailIcon, MapPinIcon, MessageCircleIcon } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { trackUserPresence } from '../lib/userPresence';

const ROLES = ['Project Manager', 'UI/UX Developer'];

function ActiveUsersCounter() {
  const [activeUsers, setActiveUsers] = useState(1);

  useEffect(() => {
    const cleanup = trackUserPresence((count) => {
      setActiveUsers(count);
    });

    return cleanup;
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

export function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden border-b border-line bg-white px-6 pb-20 pt-32 md:pb-24 md:pt-40">
      

      <div className="relative mx-auto grid w-full max-w-[896px] items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col gap-6">
          
          <ActiveUsersCounter />

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-secondary px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-sm font-medium text-accent">Open to Work</span>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="font-display text-4xl font-extrabold leading-tight text-heading md:text-[52px] md:leading-[60px]">
              Sushanta Marahatta
            </h1>
            <p
              className="font-display text-2xl font-extrabold text-accent md:text-[32px] md:leading-[40px]"
              aria-label={ROLES.join(', ')}>
              
              <span aria-hidden="true">{typed}</span>
              <span
                className="ml-0.5 inline-block h-[0.9em] w-[3px] animate-pulse bg-accent align-middle"
                aria-hidden="true" />
              
            </p>
          </div>

          <p className="text-lg font-light text-body md:text-xl">
            Building clean, user-friendly digital products.
          </p>

          <p className="flex items-center gap-2 text-base text-body">
            <MapPinIcon className="h-[18px] w-[18px]" aria-hidden="true" />
            Kathmandu, Nepal
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-heading px-8 py-4 text-base font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5">
              
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line bg-white px-8 py-4 text-base font-semibold text-heading transition-colors hover:bg-secondary dark:bg-white/10 dark:text-white dark:hover:bg-white/20">
              
              Get In Touch
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/susshxx"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-heading/70 transition-colors hover:text-accent">
              
              <GithubIcon className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/sushanta-marahatta"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-heading/70 transition-colors hover:text-accent">
              
              <LinkedinIcon className="h-6 w-6" />
            </a>
            <a
              href="https://wa.me/9779826160838"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="text-heading/70 transition-colors hover:text-accent">
              
              <MessageCircleIcon className="h-6 w-6" />
            </a>
            <>
              {/* Phones: hand off to the native mail app */}
              <a
                href="mailto:susaaant@gmail.com"
                aria-label="Contact"
                className="text-heading/70 transition-colors hover:text-accent sm:hidden"
              >
                <MailIcon className="h-6 w-6" />
              </a>

              {/* Larger screens: open Gmail compose in a new tab */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=susaaant@gmail.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Contact"
                className="hidden text-heading/70 transition-colors hover:text-accent sm:block"
              >
                <MailIcon className="h-6 w-6" />
              </a>
            </>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="flex justify-center lg:justify-end">
          
            <img
              src="/288-131.png"
              alt="Portrait of Sushanta Marahatta"
              width={300}
              height={400}
              className="h-[400px] w-[300px] object-contain" />
        </motion.div>
      </div>
    </section>);

}