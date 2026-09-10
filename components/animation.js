export const EASE_OUT = [0.22, 1, 0.36, 1];
// For elements moving/resizing on screen (not entering/exiting) — ease-out
// front-loads velocity, which makes elements traveling different distances
// (e.g. four badges reflowing) arrive at different rates and looks jumpy.
export const EASE_IN_OUT = [0.77, 0, 0.175, 1];
// Shared so every `layout`-animated element in the nav/badge tree settles on
// the exact same curve — a single un-configured layout transition anywhere in
// that chain falls back to Framer's default spring and visibly desyncs.
export const LAYOUT_TRANSITION = { duration: 0.5, ease: EASE_IN_OUT };
// Lighter than LAYOUT_TRANSITION — for small-distance UI reflows (e.g. a tab
// indicator sliding between adjacent tab labels), where the full 500ms morph
// timing reads as sluggish.
export const TAB_TRANSITION = { duration: 0.2, ease: EASE_IN_OUT };
