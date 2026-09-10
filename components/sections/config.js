export const SECTIONS = [
  {
    id: 'story',
    navLabel: 'about',
    heading: 'About',
    subtitle: (site) =>
      `Hi! So happy you're here. I'm ${site.name.split(' ')[0]} - which means narcissus, or daffodil. 
    You may have noticed a few around the site ;)`,
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
    subtitle: () => 'Happy to talk roles, research, or recommendations.',
  },
];
