import { HapticPlate, BeautyPlate } from '../components/Plates';

export const WORK_ENTRIES = [
  {
    title: 'Visuo-haptic illusions, sampled.',
    year: '2024',
    role: 'Research, code, write-up',
    stack: 'PyMC · NumPy · psychopy · matplotlib',
    status: 'Live',
    location: 'Lab notebook · Berlin',
    href: 'https://github.com/nargizas/Bayesian-Psychometric-Fit',
    caption: `Bayesian reanalysis of a VR perception study that asks how far you can push a mismatch between what a user sees and feels before they notice and the immersion breaks. That boundary was originally found by fitting the data to a curve and reading off the best single answer. The reanalysis runs the same 16-participant dataset through a <b>PyMC</b> probabilistic model: instead of one number per condition, you get a distribution of plausible answers.`,
    Plate: HapticPlate,
  },
  {
    title: 'A practice site for an aesthetician.',
    year: '2024',
    role: 'Design, Webflow build, copy',
    stack: 'Webflow · GSAP · Cloudinary',
    status: 'Live',
    location: 'Client work · Munich',
    caption: `A small Webflow build for an independent skincare practice — soft type, generous white, a booking flow that fits inside one screen. The brief was simply: <b>look expensive without trying</b>. Most of the work happened in the spacing.`,
    Plate: BeautyPlate,
  },
];
