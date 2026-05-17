import { HapticPlate, BeautyPlate } from '../components/Plates';

export const WORK_ENTRIES = [
  {
    title: 'Visuo-haptic illusions, sampled.',
    year: '2024',
    role: 'Research, code, write-up',
    stack: 'PyMC · NumPy · psychopy · matplotlib',
    location: 'GitHub',
    href: 'https://github.com/nargizas/Bayesian-Psychometric-Fit',
    caption: `Bayesian reanalysis of a VR perception study of 
    how far you can push a mismatch between what a user sees and
    feels before they notice and the immersion breaks.
    That boundary was originally found by fitting the data
    to a curve and reading off the best single answer.
    The reanalysis runs the same 16-participant dataset through
    a <b>PyMC</b> probabilistic model: instead of one number per condition,
    you get a distribution of plausible answers.`,
    Plate: HapticPlate,
  },
  {
    title: 'A medical website for an aesthetician.',
    year: '2026',
    role: 'Design, Development, deployment',
    stack: 'Webflow',
    location: 'Client work',
    href: 'https://www.doctor-krivenko.de/',
    caption: `Webflow site for an aesthetic medicine practice, showcasing their services and expertise. 
    The design is clean and modern, with a focus on usability and clear navigation.`,
    Plate: BeautyPlate,
  },
];
