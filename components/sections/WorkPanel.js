'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Tabs } from 'radix-ui';
import { getWorkEntries, getWorkCategories } from '@/lib/content';
import { BlurFade } from '@/components/ui/blur-fade';
import { Emphasis } from '@/components/ui/emphasis';
import { Button } from '@/components/ui/button';
import { EASE_OUT, TAB_TRANSITION } from '@/components/animation';

const CONTENT_TRANSITION = { duration: 0.2, ease: EASE_OUT };

// Direction-aware: the incoming tab's content slides in from the side of the
// tab that was clicked (left neighbor -> slides in from the left, and vice
// versa), while the outgoing content exits the opposite way — the same
// "enter/exit along the same path" spatial cue SectionTrack's slide uses one
// level up, just at tab scale (12px, not a full slide-width).
const contentVariants = {
  enter: (direction) => ({ opacity: 0, x: direction * 12 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction * -12 }),
};

// Fixed reference width the indicator's own DOM box is rendered at; the real
// per-tab width is applied via `scaleX`, so both position and size animate
// on `transform` only (no `width`, a layout-triggering property).
const INDICATOR_BASE_WIDTH = 100;

export function WorkPanel() {
  const categories = getWorkCategories();
  const entries = getWorkEntries();
  const [active, setActive] = useState(categories[0]?.id);
  const activeIndex = categories.findIndex((category) => category.id === active);
  const prevIndexRef = useRef(activeIndex);
  const direction = activeIndex > prevIndexRef.current ? 1 : activeIndex < prevIndexRef.current ? -1 : 0;

  useEffect(() => {
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  const activeEntries = entries.filter((entry) => entry.category === active);

  // Measured directly off the trigger DOM nodes (offsetLeft/offsetWidth —
  // local to the TabsList, unaffected by the ancestor SectionTrack's own
  // horizontal-slide transform) rather than a shared `layoutId` animation.
  // layoutId's cross-remount FLIP measurement got confused sitting inside
  // that transformed ancestor and produced a visible off-screen jump before
  // sliding back — this sidesteps it entirely.
  const triggerRefs = useRef({});
  const [indicator, setIndicator] = useState(null);

  useLayoutEffect(() => {
    const node = triggerRefs.current[active];
    if (node) setIndicator({ x: node.offsetLeft, width: node.offsetWidth });
  }, [active]);

  return (
    <Tabs.Root value={active} onValueChange={setActive}>
      <Tabs.List className="relative mb-8 flex gap-6 border-b border-ink/10">
        {categories.map((category) => (
          <Tabs.Trigger
            key={category.id}
            ref={(node) => {
              triggerRefs.current[category.id] = node;
            }}
            value={category.id}
            className="cursor-pointer pb-3 text-sm font-medium text-ink/50 outline-none transition-colors data-[state=active]:text-ink"
          >
            {category.label}
          </Tabs.Trigger>
        ))}
        {indicator && (
          <motion.div
            className="pointer-events-none absolute -bottom-px left-0 h-px bg-ink"
            style={{ width: INDICATOR_BASE_WIDTH, transformOrigin: '0 0' }}
            animate={{ x: indicator.x, scaleX: indicator.width / INDICATOR_BASE_WIDTH }}
            transition={TAB_TRANSITION}
          />
        )}
      </Tabs.List>

      <Tabs.Content value={active} className="relative">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={CONTENT_TRANSITION}
            className="flex flex-col gap-8"
          >
            {activeEntries.map((entry, i) => (
              <BlurFade key={entry.title} delay={0.05 * i} inView>
                <div className={i > 0 ? 'border-t border-ink/10 pt-5' : ''}>
                  <div className="mb-2 text-[13px] font-semibold tracking-wide text-accent">{entry.tag}</div>
                  <div className="mb-2 text-lg font-medium text-ink">{entry.title}</div>
                  <Emphasis text={entry.caption} className="max-w-[480px] text-[15px] leading-relaxed text-ink/65" />
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink/45">
                    <span>Role — {entry.role}</span>
                    <span>Stack — {entry.stack}</span>
                  </div>
                  {entry.href && (
                    <div className="mt-3">
                      <Button asChild variant="link" className="h-auto p-0">
                        <a href={entry.href} target="_blank" rel="noopener noreferrer">
                          View{entry.location ? ` · ${entry.location}` : ''} ↗
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </BlurFade>
            ))}
          </motion.div>
        </AnimatePresence>
      </Tabs.Content>
    </Tabs.Root>
  );
}
