'use client';

import { getFunContent } from '@/lib/content';

export function FunPanel() {
  const { currently, interests } = getFunContent();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="mb-3.5 text-[13px] font-semibold tracking-wide text-ink/55">Currently</div>
        <div className="flex flex-col gap-2.5">
          {currently.map((item) => (
            <div key={item.label} className="text-[15px] text-ink">
              <span className="text-ink/50">{item.label} — </span>
              {item.value}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-3.5 text-[13px] font-semibold tracking-wide text-ink/55">Interests</div>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <span key={interest} className="rounded-full bg-ink/5 px-3 py-1 text-sm text-ink">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
