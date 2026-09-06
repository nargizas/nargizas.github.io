'use client';

import { getWorkEntries } from '@/lib/content';
import { BlurFade } from '@/components/ui/blur-fade';
import { Emphasis } from '@/components/ui/emphasis';
import { Button } from '@/components/ui/button';

export function WorkPanel() {
  const entries = getWorkEntries();

  return (
    <div className="flex flex-col gap-8">
      {entries.map((entry, i) => (
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
    </div>
  );
}
