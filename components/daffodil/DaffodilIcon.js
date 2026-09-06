import { getSectionFilter } from './filters';

export function DaffodilIcon({ sectionId, className, style }) {
  return (
    <img
      src="/daffodil-head.svg"
      alt=""
      draggable={false}
      className={className}
      style={{ filter: getSectionFilter(sectionId), ...style }}
    />
  );
}
