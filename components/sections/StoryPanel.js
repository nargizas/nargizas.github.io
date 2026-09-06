'use client';

import { getStoryGroups } from '@/lib/content';
import { BlurFade } from '@/components/ui/blur-fade';

export function StoryPanel() {
  const groups = getStoryGroups();

  return (
    <div className="flex flex-col gap-10">
      {groups.map((group) => (
        <div key={group.id} className="flex flex-wrap items-start gap-6">
          <div className="w-[100px] shrink-0 pt-0.5 text-[13px] font-semibold tracking-wide text-ink/55">
            {group.label}
          </div>
          <div className="flex min-w-[200px] flex-1 flex-col gap-3.5">
            {group.rows.map((row, ri) => (
              <BlurFade key={ri} delay={0.05 * ri} inView>
                <div className="flex flex-wrap gap-5">
                  <div className="w-[120px] shrink-0 text-sm text-ink/50">{row.year}</div>
                  <div className="min-w-[180px] flex-1">
                    <div className="text-[15px] text-ink">
                      {row.role}
                      {row.org ? `, ${row.org}` : ''}
                    </div>
                    {row.blurb && <p className="mt-1 text-sm leading-relaxed text-ink/60">{row.blurb}</p>}
                    {row.publication && (
                      <p className="mt-1 text-sm leading-relaxed text-ink/60">
                        Published in {row.publication.venue}:{' '}
                        <a href={row.publication.href} target="_blank" rel="noopener noreferrer">
                          {row.publication.title} ↗
                        </a>
                      </p>
                    )}
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
          </div>
        </div>
      ))}
    </div>
  );
}
