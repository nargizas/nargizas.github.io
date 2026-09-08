'use client';

import { motion } from 'motion/react';
import { EASE_OUT } from '@/components/animation';
import { DaffodilBadge } from '@/components/daffodil/DaffodilBadge';
import { SECTIONS } from './config';

// Reference size used only for internal badge geometry (ring radius, font
// scale, etc.) — DaffodilBadge renders at whatever CSS size it's given
// below, so this doesn't need to match the actual on-screen pixels.
const LANDING_SIZE = Math.round(180 * 1.75);
const LANDING_GAP = 16;
const LANDING_MIN = 96;
const LANDING_MAX_CONTAINER = 1400;
const PAGE_HORIZONTAL_PADDING = 80;
// Guarantees all 4 badges + 3 gaps fit in one row at any viewport width,
// capped at LANDING_SIZE on wide screens instead of wrapping on narrow ones.
// Built from vw/min()/px only (never a bare "%") so it never depends on an
// ancestor's own (possibly auto/indefinite) height — that was the earlier bug.
const LANDING_DISPLAY_SIZE = `clamp(${LANDING_MIN}px, calc((min(${LANDING_MAX_CONTAINER}px, 100vw - ${PAGE_HORIZONTAL_PADDING}px) - ${LANDING_GAP * 3}px) / 4), ${LANDING_SIZE}px)`;

export function SectionNav({ activeSection, onSelect }) {
  const isLanding = activeSection == null;

  return (
    <div
      className={`flex w-full items-center justify-center transition-[margin-top] duration-500 ease-[var(--ease-out)] motion-reduce:duration-0 ${
        isLanding ? 'mt-14 flex-nowrap' : 'mt-7 flex-wrap gap-4'
      }`}
      style={isLanding ? { gap: LANDING_GAP } : undefined}
    >
      {SECTIONS.map((section) => {
        const active = section.id === activeSection;
        const size = isLanding ? LANDING_SIZE : active ? 76 : 60;
        const displaySize = isLanding ? LANDING_DISPLAY_SIZE : `${size}px`;

        return (
          <motion.button
            key={section.id}
            type="button"
            layout
            transition={{ duration: 0.5, ease: EASE_OUT }}
            onClick={() => onSelect(section.id)}
            className="flex cursor-pointer items-center justify-center bg-transparent p-0"
          >
            <motion.div layout style={{ width: displaySize, height: displaySize }}>
              <DaffodilBadge
                sectionId={section.id}
                label={section.navLabel}
                size={size}
                active={isLanding || active}
                className="block h-full w-full"
              />
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
}
