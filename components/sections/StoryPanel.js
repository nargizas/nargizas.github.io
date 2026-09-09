'use client';

import { getStoryGroups } from '@/lib/content';
import { BlurFade } from '@/components/ui/blur-fade';
import { Button } from '@/components/ui/button';

export function StoryPanel() {
  const groups = getStoryGroups();
  let rowIndex = 0;

  return (
    <div className="flex flex-col gap-10">
      {groups.map((group, gi) => (
        <div key={group.id} className={gi > 0 ? 'border-t border-ink/10 pt-10' : ''}>
          <h3 className="mb-5 font-display text-xl font-medium tracking-tight text-ink">{group.label}</h3>
          <div className="flex flex-col gap-3.5">
            {group.rows.map((row) => {
              const delay = 0.05 * rowIndex;
              rowIndex += 1;

              return (
                <BlurFade key={`${row.role}-${row.year}`} delay={delay} inView>
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
                          <Button asChild variant="link" className="h-auto whitespace-normal p-0 text-left">
                            <a href={row.publication.href} target="_blank" rel="noopener noreferrer">
                              {row.publication.title}&nbsp;↗
                            </a>
                          </Button>
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
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
