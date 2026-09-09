const article = (word) => (/^[aeiou]/i.test(word) ? 'an' : 'a');

export const SECTIONS = [
  {
    id: 'story',
    navLabel: 'about',
    heading: 'About',
    subtitle: (site) => `Hi, I'm ${site.name.split(' ')[0]}. I'm ${article(site.role)} ${site.role}.`,
  },
  {
    id: 'work',
    navLabel: 'work',
    heading: 'Work',
    subtitle: () => "A few of the systems I've built and shipped.",
  },
  {
    id: 'fun',
    navLabel: 'fun',
    heading: 'Fun',
    subtitle: () => 'A few things outside of work, right now.',
  },
  {
    id: 'contact',
    navLabel: 'contact',
    heading: 'Contact',
    subtitle: () => 'Happy to talk research, roles, or recommendations.',
  },
];
