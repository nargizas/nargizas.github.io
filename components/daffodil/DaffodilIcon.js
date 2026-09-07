import { getSectionFilter } from './filters';

const SECTION_ICONS = {
  story: '/daffodil-head-story.svg',
  work: '/daffodil-head-work.svg',
  fun: '/daffodil-head-fun.svg',
  contact: '/daffodil-head-contact.svg',
};

export function DaffodilIcon({ sectionId, className, style }) {
  const src = SECTION_ICONS[sectionId];

  return (
    <img
      src={src ?? '/daffodil-head.svg'}
      alt=""
      draggable={false}
      className={className}
      style={src ? style : { filter: getSectionFilter(sectionId), ...style }}
    />
  );
}
