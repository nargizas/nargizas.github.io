'use client';

import { getSiteConfig } from '@/lib/content';
import { Separator } from '@/components/ui/separator';

export function Landing({ isLanding, onNameClick }) {
  const site = getSiteConfig();

  return (
    <div className="flex flex-col items-center text-center">
      <h1
        onClick={onNameClick}
        className={`cursor-pointer font-display font-medium leading-[1.1] tracking-tight transition-[font-size] duration-500 ${
          isLanding ? 'text-[clamp(34px,5vw,56px)]' : 'text-[26px]'
        }`}
      >
        {site.name}
      </h1>

      <div
        className={`overflow-hidden transition-[max-height,opacity,margin-top] duration-500 ${
          isLanding ? 'mt-3 max-h-[220px] opacity-100' : 'mt-0 max-h-0 opacity-0'
        }`}
      >
        <div className="text-sm font-semibold uppercase tracking-wider text-accent">{site.role}</div>
        <p className="mx-auto mt-5 max-w-[560px] text-[clamp(16px,1.8vw,19px)] leading-relaxed text-ink/60">
          {site.bio}
        </p>
      </div>

      <Separator
        className={`w-full bg-ink/10 transition-[margin-top,opacity] duration-500 ${
          isLanding ? 'mt-14 opacity-100' : 'mt-7 opacity-40'
        }`}
      />
    </div>
  );
}
