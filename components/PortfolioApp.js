'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { getSiteConfig } from '@/lib/content';
import { Landing } from './sections/Landing';
import { SectionNav } from './sections/SectionNav';
import { StoryPanel } from './sections/StoryPanel';
import { WorkPanel } from './sections/WorkPanel';
import { FunPanel } from './sections/FunPanel';
import { ContactPanel } from './sections/ContactPanel';
import { DaffodilIllustration } from './daffodil/DaffodilIllustration';
import { SECTIONS } from './sections/config';

const PANELS = {
  story: StoryPanel,
  work: WorkPanel,
  fun: FunPanel,
  contact: ContactPanel,
};

export default function PortfolioApp() {
  const [activeSection, setActiveSection] = useState(null);
  const site = getSiteConfig();
  const section = SECTIONS.find((s) => s.id === activeSection);
  const ActivePanel = activeSection ? PANELS[activeSection] : null;

  return (
    <div className="flex min-h-screen flex-col items-center bg-paper px-6 py-12 font-sans text-ink sm:px-10 md:py-24">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center">
        <Landing isLanding={!activeSection} onNameClick={() => setActiveSection(null)} />
        <SectionNav activeSection={activeSection} onSelect={setActiveSection} />

        <AnimatePresence>
          {section && ActivePanel && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mt-12 w-full overflow-hidden"
            >
              <div className="flex w-full flex-wrap items-start justify-center gap-10 pb-4 md:gap-16">
                <div className="flex flex-1 basis-[260px] justify-center" style={{ maxWidth: 320 }}>
                  <div className="w-full">
                    <DaffodilIllustration sectionId={activeSection} className="block h-auto w-full" />
                  </div>
                </div>

                <div className="min-w-0 flex-[2_1_380px] text-left" style={{ maxWidth: 560 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSection}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h2 className="mb-5 font-serif text-[clamp(24px,3vw,32px)] font-medium text-ink">
                        {section.heading}
                      </h2>
                      <p className="mb-12 max-w-[520px] text-[17px] leading-relaxed text-ink/60">
                        {section.subtitle(site)}
                      </p>
                      <ActivePanel />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
