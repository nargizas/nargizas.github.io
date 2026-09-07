'use client';

import { DaffodilIcon } from './DaffodilIcon';

// Each flower's bloom sits at a different scale/offset inside its 768x1344
// source canvas. These per-section constants (derived from each SVG's actual
// flower_head bounding box) normalize every bloom to the same apparent size
// and center it in a `size`x`size` box, so the ring text stays concentric
// with the flower regardless of which section is being rendered.
const BADGE_GEOMETRY = {
  story: { scaleW: 1.2112, left: -0.0966, top: 0.1097 },
  work: { scaleW: 1.097, left: -0.033, top: 0.0955 },
  contact: { scaleW: 1.3099, left: -0.1345, top: 0.098 },
  fun: { scaleW: 1.2048, left: -0.1432, top: 0.147 },
};

const TEXT_RADIUS_FRACTION = 0.38;
const FONT_SIZE_FRACTION = 0.078;
const MIN_FONT_SIZE = 9;

export function DaffodilBadge({ sectionId, label, size, active, className }) {
  const geo = BADGE_GEOMETRY[sectionId] ?? BADGE_GEOMETRY.story;

  const renderedW = geo.scaleW * size;
  const renderedH = renderedW * 1.5;
  const left = geo.left * size;
  const top = geo.top * size;

  const cx = size / 2;
  const cy = size / 2;
  const r = TEXT_RADIUS_FRACTION * size;
  const fontSize = Math.max(FONT_SIZE_FRACTION * size, MIN_FONT_SIZE);
  const pathId = `daffodil-ring-${sectionId}`;
  const ringPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 0 ${cx + r} ${cy}`;

  return (
    <div className={className} style={{ position: 'relative', width: size, height: size }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <DaffodilIcon
          sectionId={sectionId}
          style={{ position: 'absolute', width: renderedW, height: renderedH, left, top, maxWidth: 'none' }}
        />
      </div>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
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
