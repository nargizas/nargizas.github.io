const SECTION_ILLUSTRATIONS = {
  story: '/daffodil_story.svg',
  work: '/daffodil_work.svg',
  fun: '/daffodil_fun.svg',
  contact: '/daffodil_contact.svg',
};

// Matches the daffodil_*.svg source viewBox (a portrait flower-with-stem
// illustration) so the ring overlay lines up pixel-for-pixel with the image
// regardless of its rendered size.
const VIEWBOX_WIDTH = 768;
const VIEWBOX_HEIGHT = 1344;
// Reserve real headroom above the image (as a fraction of width, so it scales
// with the rendered size) instead of drawing the ring over negative
// coordinates — content painted outside the image's own box would get
// clipped by the section track's overflow:hidden.
const HEADROOM_FRACTION = 0.15; 
const HEADROOM = VIEWBOX_WIDTH * HEADROOM_FRACTION; // 768 * 0.12 = 92.16

const TOTAL_VIEWBOX_HEIGHT = VIEWBOX_HEIGHT + HEADROOM;
// The ring sits inside that headroom band, clear of the bloom (which starts
// at y = HEADROOM, roughly 79 units below the ring's lowest point here).
const RING_CENTER_Y = 320; 
const RING_RADIUS = 210; 

export function DaffodilIllustration({ sectionId, label, className }) {
  const cx = VIEWBOX_WIDTH * 0.9 / 2 ;
  const pathId = `illustration-ring-${sectionId}`;
  const ringPath = `M ${cx - RING_RADIUS} ${RING_CENTER_Y} A ${RING_RADIUS} ${RING_RADIUS} 0 0 1 ${cx + RING_RADIUS} ${RING_CENTER_Y}`;

  return (
    <div className="relative" style={label ? { paddingTop: `${HEADROOM_FRACTION * 100}%` } : undefined}>
      <img
        src={SECTION_ILLUSTRATIONS[sectionId] ?? SECTION_ILLUSTRATIONS.story}
        alt=""
        draggable={false}
        className={className}
      />
      {label && (
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${TOTAL_VIEWBOX_HEIGHT}`}
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ overflow: 'visible' }}
        >
          <g transform={`rotate(-20 ${cx} ${RING_CENTER_Y}) `}>
            <path id={pathId} d={ringPath} fill="none" />
            <text fontSize={96} letterSpacing="0.01 em" className="fill-ink font-display">
              <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
                {label}
              </textPath>
            </text>
          </g>
          
        </svg>
      )}
    </div>
  );
}
