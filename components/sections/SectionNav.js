'use client';

import { motion } from 'motion/react';
import { EASE_OUT, LAYOUT_TRANSITION } from '@/components/animation';
import { DaffodilBadge } from '@/components/daffodil/DaffodilBadge';
import { SECTIONS } from './config';

// Reference size used only for internal badge geometry (ring radius, font
// scale, etc.) — DaffodilBadge renders at whatever CSS size it's given
// below, so this doesn't need to match the actual on-screen pixels.
const LANDING_SIZE = Math.round(180 * 1.75);
// Tighter spacing while the landing/bio is visible so the big blooms read as
// one cluster; once a section is active the badges shrink and get the roomier
// SECTION_GAP. LANDING_GAP also feeds the display-size clamp below, so both the
// container gap and the fit-in-one-row math stay in sync for the landing state.
const LANDING_GAP = 8;
const SECTION_GAP = 16;
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
    <motion.div
      layout
      transition={LAYOUT_TRANSITION}
      className={`flex w-full flex-nowrap items-center justify-center ${isLanding ? 'mt-14' : 'mt-7'}`}
      style={{ gap: isLanding ? LANDING_GAP : SECTION_GAP }}
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
            animate={{ opacity: isLanding || active ? 1 : 0.4 }}
            whileTap={{ scale: 0.97 }}
            transition={{
              layout: LAYOUT_TRANSITION,
              scale: { duration: 0.16, ease: EASE_OUT },
              opacity: LAYOUT_TRANSITION,
            }}
            onClick={() => onSelect(section.id)}
            className="flex cursor-pointer items-center justify-center bg-transparent p-0"
          >
            <motion.div layout transition={LAYOUT_TRANSITION} style={{ width: displaySize, height: displaySize }}>
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
    </motion.div>
  );
}
