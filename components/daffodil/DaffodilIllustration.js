'use client';

import { motion } from 'motion/react';
import { EASE_OUT, SECTION_TRANSITION_DURATION } from '@/components/animation';

const SECTION_ILLUSTRATIONS = {
  story: '/daffodil_story.svg',
  work: '/daffodil_work.svg',
  fun: '/daffodil_fun.svg',
  contact: '/daffodil_contact.svg',
};

export function DaffodilIllustration({ sectionId, className }) {
  return (
    <motion.img
      key={sectionId}
      src={SECTION_ILLUSTRATIONS[sectionId] ?? SECTION_ILLUSTRATIONS.story}
      alt=""
      draggable={false}
      className={className}
      style={{ transformOrigin: 'top center' }}
      initial={{ clipPath: 'inset(0% 0% 78% 0%)', scale: 0.72 }}
      animate={{
        clipPath: ['inset(0% 0% 78% 0%)', 'inset(0% 0% 56% 0%)', 'inset(0% 0% 0% 0%)'],
        scale: [0.72, 1, 1],
      }}
      transition={{ duration: SECTION_TRANSITION_DURATION, ease: EASE_OUT, times: [0, 0.55, 1] }}
    />
  );
}
