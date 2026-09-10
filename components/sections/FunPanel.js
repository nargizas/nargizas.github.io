'use client';

import { getFunContent } from '@/lib/content';
import { BlurFade } from '@/components/ui/blur-fade';

export function FunPanel() {
  const { currently, interests } = getFunContent();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="mb-3.5 text-[13px] font-semibold tracking-wide text-ink/55">Currently</div>
        <div className="flex flex-col gap-2.5">
          {currently.map((item, i) => (
            <BlurFade key={item.label} delay={0.05 * i} inView>
              <div className="text-[15px] text-ink">
                <span className="text-ink/50">{item.label} — </span>
                {item.value}
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-3.5 text-[13px] font-semibold tracking-wide text-ink/55">Interests</div>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, i) => (
            <BlurFade key={interest} delay={0.05 * i} inView>
              <span className="rounded-full bg-ink/5 px-3 py-1 text-sm text-ink">
                {interest}
              </span>
            </BlurFade>
          ))}
        </div>
      </div>
    </div>
  );
}
