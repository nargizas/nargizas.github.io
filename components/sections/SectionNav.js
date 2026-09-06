'use client';

import { motion } from 'motion/react';
import { DaffodilIcon } from '@/components/daffodil/DaffodilIcon';
import { SECTIONS } from './config';

export function SectionNav({ activeSection, onSelect }) {
  const isLanding = activeSection == null;

  return (
    <div
      className={`flex w-full flex-wrap items-end justify-center transition-[margin-top] duration-500 ${
        isLanding ? 'mt-14 gap-[clamp(20px,3vw,32px)]' : 'mt-7 gap-4'
      }`}
    >
      {SECTIONS.map((section) => {
        const active = section.id === activeSection;
        const size = isLanding ? 180 : active ? 76 : 60;
        const height = Math.round((size * 560) / 832);

        return (
          <motion.button
            key={section.id}
            type="button"
            layout
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onClick={() => onSelect(section.id)}
            className={`flex cursor-pointer flex-col items-center bg-transparent p-0 ${
              isLanding ? 'gap-4' : 'gap-2'
            }`}
          >
            <motion.div layout className="overflow-hidden rounded-xl" style={{ width: size, height }}>
              <DaffodilIcon sectionId={section.id} className="block h-auto w-full" />
            </motion.div>
            <span
              className={`font-medium transition-colors duration-300 ${
                isLanding ? 'text-[15px]' : 'text-[11px]'
              } ${isLanding || active ? 'text-ink' : 'text-ink/45'}`}
            >
              {section.navLabel}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
