export const WORK_CATEGORIES = [
  { id: 'ai', label: 'AI Engineering' },
  { id: 'vr', label: 'VR' },
  { id: 'design', label: 'Design' },
];

export const WORK_ENTRIES = [
  {
    category: 'ai',
    title: 'Demand forecasting for QSR kitchens.',
    year: '2026',
    tag: 'AI Engineering · Forecasting',
    role: 'Statistical modeling, R&D',
    stack: 'Python · Nixtla · Prophet · pandas · scikit-learn',
    caption: `Autoclustering of food products by shared ingredients, paired with R&D
      on statistical demand models built with **Nixtla** and **Prophet** — testing how
      weather, city events, and promotional sales shift kitchen prep needs. The goal:
      less food waste, faster prep, for quick-service kitchens.`,
  },
  {
    category: 'ai',
    title: 'An AI opponent for a PvPvE game.',
    year: '2023–2024',
    tag: 'Game AI · Reinforcement Learning',
    role: 'Training pipeline, evaluation',
    stack: 'Python · PyTorch · Ray RLlib · Gymnasium · Unity · Go',
    caption: `Deep reinforcement learning AI opponent for **South Pole Bebop**, a PvPvE
      game. Built the training pipeline and evaluation harness, then ran experiments
      across model architectures and reward shaping.`,
  },
  {
    category: 'ai',
    title: 'Visuo-haptic illusions, sampled.',
    year: '2024',
    tag: 'Research · Bayesian stats',
    role: 'Research, code, write-up',
    stack: 'PyMC · NumPy · psychopy · matplotlib',
    location: 'GitHub',
    href: 'https://github.com/nargizas/Bayesian-Psychometric-Fit',
    caption: `Bayesian reanalysis of a VR perception study of how far you can push a mismatch
      between what a user sees and feels before they notice and the immersion breaks. That
      boundary was originally found by fitting the data to a curve and reading off the best
      single answer. The reanalysis runs the same 16-participant dataset through a **PyMC**
      probabilistic model: instead of one number per condition, you get a distribution of
      plausible answers.`,
  },
  {
    category: 'ai',
    title: 'Evaluating LLMs for automatic bug reproduction.',
    year: '2023',
    tag: 'Research · Code LLMs',
    role: 'Research, code, write-up',
    stack: 'Python · Hugging Face · OpenAI API',
    location: 'Paper',
    href: 'https://dl.acm.org/doi/10.1109/TSE.2024.3450837',
    caption: `Evaluated how well diverse large language models can automatically and
      generally reproduce reported software bugs from natural-language descriptions.
      Published in **IEEE Transactions on Software Engineering**.`,
  },
  {
    category: 'vr',
    title: 'A VR factory tour for industrial training.',
    year: '2026',
    tag: 'VR · Industrial training',
    role: 'Design, development',
    stack: 'Unity · C# · Meta Quest · XR Interaction Toolkit',
    caption: `VR factory tour for a cutting-tools manufacturer, mixing 360° video with
      3D assets, spatial audio, and interactive hotspots — hands-on training without
      the factory floor.`,
  },
  {
    category: 'vr',
    title: 'Visuo-haptic illusions with shape-changing floors.',
    year: '2023',
    tag: 'Research · HCI/VR',
    role: 'Research, design, prototyping',
    stack: 'VR · Unity · C#',
    location: 'Paper',
    href: 'https://dl.designresearchsociety.org/iasdr/iasdr2023/fullpapers/164/',
    caption: `Explored how a floor-based shape-changing display can create visuo-haptic
      illusions in VR — letting a flat floor feel like a slope or a step. Published at
      **IASDR 2023**.`,
  },
  {
    category: 'design',
    title: 'A professional website for a medical aesthetician.',
    year: '2026',
    tag: 'Client work · Webflow',
    role: 'Design, Development, deployment',
    stack: 'Webflow',
    location: 'Live site',
    href: 'https://www.doctor-krivenko.de/',
    caption: `Webflow site for an aesthetic medicine practice, showcasing their services and
      expertise. The design is clean and modern, with a focus on usability and clear
      navigation.`,
  },
];
