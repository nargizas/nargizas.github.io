'use client';

import { AnimatePresence, motion } from 'motion/react';
import { getSiteConfig } from '@/lib/content';
import { Separator } from '@/components/ui/separator';
import { EASE_OUT, LAYOUT_TRANSITION } from '@/components/animation';

export function Landing({ isLanding, onNameClick }) {
  const site = getSiteConfig();

  return (
    <div className="flex flex-col items-center text-center">
      <motion.h1
        layout
        onClick={onNameClick}
        whileTap={{ scale: 0.97 }}
        transition={{ layout: LAYOUT_TRANSITION, scale: { duration: 0.14, ease: EASE_OUT } }}
        className={`cursor-pointer font-display font-medium leading-[1.1] tracking-tight ${
          isLanding ? 'text-[clamp(34px,5vw,56px)]' : 'text-[26px]'
        }`}
      >
        {site.name}
      </motion.h1>

      <motion.div layout transition={LAYOUT_TRANSITION} className="relative w-full overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          {isLanding && (
            <motion.div
              key="bio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="mt-3"
            >
              <div className="text-sm font-semibold uppercase tracking-wider text-accent">{site.role}</div>
              <p className="mx-auto mt-5 max-w-[560px] text-[clamp(16px,1.8vw,19px)] leading-relaxed text-ink/60">
                {site.bio}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        layout
        transition={LAYOUT_TRANSITION}
        animate={{ opacity: isLanding ? 1 : 0.4 }}
        className={`w-full ${isLanding ? 'mt-14' : 'mt-7'}`}
      >
        <Separator className="w-full bg-ink/10" />
      </motion.div>
    </div>
  );
}
