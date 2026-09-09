'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { Landing } from './sections/Landing';
import { SectionNav } from './sections/SectionNav';
import { SectionTrack } from './sections/SectionTrack';
import { SECTIONS } from './sections/config';
import { EASE_OUT } from './animation';

const SECTION_IDS = new Set(SECTIONS.map((s) => s.id));

function readSectionFromLocation() {
  if (typeof window === 'undefined') return null;
  const id = new URLSearchParams(window.location.search).get('section');
  return SECTION_IDS.has(id) ? id : null;
}

export default function PortfolioApp() {
  const [activeSection, setActiveSection] = useState(null);

  // Deep-link + Back/Forward support: the section lives in the URL, and every
  // navigation pushes a real history entry so the browser Back button undoes it.
  useEffect(() => {
    setActiveSection(readSectionFromLocation());
    const onPopState = () => setActiveSection(readSectionFromLocation());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((id) => {
    setActiveSection(id);
    const url = id ? `${window.location.pathname}?section=${id}` : window.location.pathname;
    window.history.pushState({ section: id }, '', url);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col items-center bg-paper px-6 py-12 font-sans text-ink sm:px-10 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className={`mx-auto flex w-full flex-col items-center ${
            activeSection ? 'max-w-[1120px]' : 'max-w-[1400px]'
          }`}
        >
          <Landing isLanding={!activeSection} onNameClick={() => navigate(null)} />
          <SectionNav activeSection={activeSection} onSelect={navigate} />

          <AnimatePresence initial={false}>
            {activeSection && (
              <motion.div
                key="track"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE_OUT, delay: 0.15 } }}
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.25, ease: EASE_OUT } }}
                className="mt-12 w-full"
              >
                <SectionTrack activeSection={activeSection} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
