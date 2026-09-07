'use client';

import { motion } from 'motion/react';
import { DaffodilBadge } from '@/components/daffodil/DaffodilBadge';
import { SECTIONS } from './config';

const LANDING_SIZE = Math.round(180 * 1.75);

export function SectionNav({ activeSection, onSelect }) {
  const isLanding = activeSection == null;

  return (
    <div
      className={`flex w-full flex-wrap items-center justify-center transition-[margin-top] duration-500 ${
        isLanding ? 'mt-14 gap-[clamp(20px,3vw,32px)]' : 'mt-7 gap-4'
      }`}
    >
      {SECTIONS.map((section) => {
        const active = section.id === activeSection;
        const size = isLanding ? LANDING_SIZE : active ? 76 : 60;

        return (
          <motion.button
            key={section.id}
            type="button"
            layout
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onClick={() => onSelect(section.id)}
            className="flex cursor-pointer items-center justify-center bg-transparent p-0"
          >
            <motion.div layout style={{ width: size, height: size }}>
              <DaffodilBadge sectionId={section.id} label={section.navLabel} size={size} active={isLanding || active} />
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
}
