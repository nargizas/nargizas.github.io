'use client';

import { getContactLinks, getSiteConfig } from '@/lib/content';
import { BlurFade } from '@/components/ui/blur-fade';

export function ContactPanel() {
  const links = getContactLinks();
  const { availability } = getSiteConfig();

  return (
    <div className="flex max-w-[420px] flex-col gap-4">
      {availability && <p className="mb-2 text-[15px] leading-relaxed text-ink/65">{availability}</p>}
      {links.map((link, i) => {
        const isMail = link.href.startsWith('mailto:');
        return (
          <BlurFade key={link.label} delay={0.05 * i} inView>
            <div className="flex justify-between border-t border-ink/10 pt-3.5">
              <span className="text-sm text-ink/55">{link.label}</span>
              <a
                href={link.href}
                target={isMail ? undefined : '_blank'}
                rel={isMail ? undefined : 'noopener noreferrer'}
                className="text-[15px] font-medium"
              >
                {link.value}
              </a>
            </div>
          </BlurFade>
        );
      })}
    </div>
  );
}
