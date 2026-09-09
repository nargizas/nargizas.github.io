'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { getSiteConfig } from '@/lib/content';
import { DaffodilIllustration } from '@/components/daffodil/DaffodilIllustration';
import { StoryPanel } from './StoryPanel';
import { WorkPanel } from './WorkPanel';
import { FunPanel } from './FunPanel';
import { ContactPanel } from './ContactPanel';
import { SECTIONS } from './config';
import { EASE_IN_OUT } from '@/components/animation';

const PANELS = {
  story: StoryPanel,
  work: WorkPanel,
  fun: FunPanel,
  contact: ContactPanel,
};

const TRACK_TRANSITION = { duration: 0.5, ease: EASE_IN_OUT };

// Slides sit side by side in a track SECTIONS.length screens wide; switching
// sections translates the track by one slide-width (transform, not resize).
// Each slide keeps its own natural height — measured via ref — instead of
// all four sharing the tallest one's height, so short panels don't inherit
// a block of empty space from a taller neighbor.
export function SectionTrack({ activeSection }) {
  const site = getSiteConfig();
  const index = Math.max(
    SECTIONS.findIndex((s) => s.id === activeSection),
    0
  );
  const slideRefs = useRef({});
  const [height, setHeight] = useState(null);

  useLayoutEffect(() => {
    const node = slideRefs.current[activeSection];
    if (!node) return;
    // ResizeObserver (not just a window-resize listener) so height also
    // re-tracks when the active panel's own content changes size for a
    // reason other than viewport width — e.g. switching tabs inside Work.
    const measure = () => setHeight(node.offsetHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [activeSection]);

  return (
    <motion.div
      animate={{ height: height ?? 'auto' }}
      transition={TRACK_TRANSITION}
      className="relative w-full overflow-hidden"
    >
      <motion.div
        className="flex items-start"
        style={{ width: `${SECTIONS.length * 100}%` }}
        initial={false}
        animate={{ x: `-${index * (100 / SECTIONS.length)}%` }}
        transition={TRACK_TRANSITION}
      >
        {SECTIONS.map((section) => {
          const ActivePanel = PANELS[section.id];
          const isActive = section.id === activeSection;

          return (
            <div
              key={section.id}
              ref={(node) => {
                slideRefs.current[section.id] = node;
              }}
              aria-hidden={!isActive}
              inert={!isActive}
              style={{ width: `${100 / SECTIONS.length}%` }}
              className="flex shrink-0 flex-wrap items-start justify-center gap-10 pb-4 md:gap-16"
            >
              <div className="flex flex-1 basis-[260px] justify-center" style={{ maxWidth: 320 }}>
                <div className="w-full">
                  <DaffodilIllustration
                    sectionId={section.id}
                    label={section.navLabel}
                    className="block h-auto w-full"
                  />
                </div>
              </div>

              <div className="min-w-0 flex-[2_1_380px] text-left" style={{ maxWidth: 560 }}>
                <h2 className="sr-only">{section.heading}</h2>
                <p className="mb-12 max-w-[520px] text-[17px] leading-relaxed text-ink/60">
                  {section.subtitle(site)}
                </p>
                <ActivePanel />
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
