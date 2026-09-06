import { SITE, CONTACT_LINKS, FUN_CONTENT, FOOTER } from '@/content/site';
import { WORK_ENTRIES } from '@/content/work';
import { EXPERIENCE_ENTRIES } from '@/content/experience';
import { EDUCATION_ENTRIES } from '@/content/education';
import { HONORS_ENTRIES } from '@/content/honors';

export function formatRange({ start, end }) {
  if (end == null) return `${start}–Present`;
  if (end === start) return start;
  return `${start}–${end}`;
}

function toRow(entry) {
  const { range, role, org, location, type, blurb, tags, publication } = entry;
  return {
    year: formatRange(range),
    role,
    org,
    location,
    type,
    blurb,
    tags,
    publication,
  };
}

export function getSiteConfig() {
  return SITE;
}

export function getFooter() {
  return FOOTER;
}

export function getWorkEntries() {
  return WORK_ENTRIES;
}

export function getContactLinks() {
  return CONTACT_LINKS;
}

export function getFunContent() {
  return FUN_CONTENT;
}

export function getStoryGroups() {
  const groups = [
    { id: 'experience', label: 'Experience', rows: EXPERIENCE_ENTRIES.map(toRow) },
    { id: 'education', label: 'Education', rows: EDUCATION_ENTRIES.map(toRow) },
    { id: 'honors', label: 'Honors', rows: HONORS_ENTRIES.map(toRow) },
  ];
  return groups.filter((group) => group.rows.length > 0);
}
