'use client';

import { DaffodilIcon } from './DaffodilIcon';

// daffodil-head-*.svg each carry a per-file viewBox tightly centered on
// that bloom's own bounding box, sized so every bloom fills the same
// fraction of its frame — so cover-fit renders all four at matching size.
const TEXT_RADIUS_FRACTION = 0.48;
const FONT_SIZE_FRACTION = 0.078;
const MIN_FONT_SIZE = 12;

export function DaffodilBadge({ sectionId, label, size, active, className }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = TEXT_RADIUS_FRACTION * size;
  const fontSize = Math.max(FONT_SIZE_FRACTION * size, MIN_FONT_SIZE);
  const pathId = `daffodil-ring-${sectionId}`;
  const ringPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 0 ${cx + r} ${cy}`;

  return (
    <div className={className} style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <DaffodilIcon
          sectionId={sectionId}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}
      >
        <path id={pathId} d={ringPath} fill="none" />
        <text
          fontSize={fontSize}
          letterSpacing="0.06em"
          className={`font-display transition-[fill-opacity] duration-300 ${active ? 'fill-ink' : 'fill-ink/45'}`}
        >
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            {label}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
