'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Tabs } from 'radix-ui';
import { getSiteConfig, getStoryGroups } from '@/lib/content';
import { BlurFade } from '@/components/ui/blur-fade';
import { Emphasis } from '@/components/ui/emphasis';
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

export function StoryPanel() {
  const { about } = getSiteConfig();
  const groups = getStoryGroups();
  const [active, setActive] = useState(groups[0]?.id);
  const activeIndex = groups.findIndex((group) => group.id === active);
  const prevIndexRef = useRef(activeIndex);
  const direction = activeIndex > prevIndexRef.current ? 1 : activeIndex < prevIndexRef.current ? -1 : 0;

  useEffect(() => {
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  const activeGroup = groups.find((group) => group.id === active);
  const activeRows = activeGroup?.rows ?? [];

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
    <div className="flex flex-col gap-10">
      {about && (
        <BlurFade delay={0}>
          <Emphasis text={about} className="max-w-[520px] text-balance text-[15px] leading-relaxed text-ink/70" />
        </BlurFade>
      )}

      <Tabs.Root value={active} onValueChange={setActive}>
        <Tabs.List className="relative mb-8 flex gap-6 border-b border-ink/10">
          {groups.map((group) => (
            <Tabs.Trigger
              key={group.id}
              ref={(node) => {
                triggerRefs.current[group.id] = node;
              }}
              value={group.id}
              className="cursor-pointer pb-3 text-sm font-medium text-ink/50 outline-none transition-colors data-[state=active]:text-ink"
            >
              {group.label}
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
              className="flex flex-col gap-3.5"
            >
              {activeRows.map((row, i) => (
                <BlurFade key={`${row.role}-${row.year}`} delay={0.05 * i} inView>
                  <div className="flex flex-wrap gap-5">
                    <div className="w-[120px] shrink-0 text-sm text-ink/50">{row.year}</div>
                    <div className="min-w-[180px] flex-1">
                      <div className="text-[15px] text-ink">
                        {row.role}
                        {row.org ? `, ${row.org}` : ''}
                      </div>
                      {row.blurb && <p className="mt-1 text-sm leading-relaxed text-ink/60">{row.blurb}</p>}
                      {row.tags?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {row.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-ink/5 px-2 py-0.5 text-[11px] text-ink/55">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </BlurFade>
              ))}
            </motion.div>
          </AnimatePresence>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
