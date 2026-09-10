export const SECTION_FILTERS = {
  story: 'none',
  work: 'hue-rotate(18deg) saturate(0.82) brightness(1.03)',
  fun: 'saturate(1.35) hue-rotate(-8deg) brightness(1.06)',
  contact: 'grayscale(0.5) sepia(0.22) brightness(1.22) saturate(0.9)',
};

export function getSectionFilter(sectionId) {
  return SECTION_FILTERS[sectionId] ?? SECTION_FILTERS.story;
}
