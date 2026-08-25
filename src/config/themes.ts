// xoxo/Cassie-Web/src/config/themes.ts
// All site colour themes. The vars Record maps CSS custom-property names
// (without the leading --) to their raw values.  Gradient / shadow vars hold
// full CSS values; HSL base vars hold bare "H S% L%" tokens.
// mode: 'dark' | 'light' — used by ThemeSwitcher to group themes.

export interface Theme {
  id: string;
  name: string;
  mode: 'dark' | 'light';
  /** CSS gradient string shown in the switcher circle */
  previewGradient: string;
  vars: Record<string, string>;
}

export const themes: Theme[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // DARK THEMES
  // ═══════════════════════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────────────────────
  // 1. Blue Indigo  ·  DEFAULT  (#3C467B / #50589C / #636CCB / #6E8CFB)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'indigo',
    name: 'Blue Indigo',
    mode: 'dark',
    previewGradient: 'linear-gradient(135deg, #3C467B 0%, #636CCB 55%, #6E8CFB 100%)',
    vars: {
      'background':           '232 38% 17%',
      'foreground':           '228 40% 97%',
      'card':                 '232 34% 23%',
      'card-foreground':      '228 40% 97%',
      'popover':              '232 34% 23%',
      'popover-foreground':   '228 40% 97%',
      'primary':              '227 95% 71%',
      'primary-foreground':   '232 38% 12%',
      'primary-glow':         '230 90% 68%',
      'secondary':            '234 30% 32%',
      'secondary-foreground': '228 40% 97%',
      'muted':                '232 26% 26%',
      'muted-foreground':     '228 22% 72%',
      'accent':               '235 50% 59%',
      'accent-foreground':    '232 38% 12%',
      'destructive':          '0 70% 66%',
      'destructive-foreground':'228 40% 97%',
      'border':               '234 30% 37%',
      'input':                '234 30% 29%',
      'ring':                 '227 95% 71%',
      'glass-bg':             '232 32% 28%',
      'glass-border':         '227 55% 62%',
      'glass-shine':          '228 80% 96%',
      // sticker hue-rotate (shifts sticker PNG colors to match theme palette)
      'sticker-hue-shift':    '0deg',
      // aurora blob colours (bare HSL tokens)
      'aurora-blob-1':        '227 95% 71%',
      'aurora-blob-2':        '235 50% 59%',
      'aurora-blob-3':        '220 80% 75%',
      'aurora-blob-4':        '240 55% 65%',
      'aurora-blob-5':        '227 90% 68%',
      // gradients
      'gradient-aurora':      'linear-gradient(135deg, hsl(227 95% 71%), hsl(235 50% 59%) 50%, hsl(220 80% 75%))',
      'gradient-mesh':
        'radial-gradient(at 15% 25%, hsl(227 95% 71% / 0.28) 0px, transparent 52%),' +
        'radial-gradient(at 85% 10%, hsl(235 50% 59% / 0.22) 0px, transparent 52%),' +
        'radial-gradient(at 70% 85%, hsl(220 80% 72% / 0.20) 0px, transparent 52%),' +
        'radial-gradient(at 10% 90%, hsl(234 60% 62% / 0.16) 0px, transparent 50%)',
      'gradient-text':        'linear-gradient(135deg, hsl(228 60% 94%), hsl(227 95% 78%), hsl(235 60% 72%))',
      // shadows
      'shadow-glow':    '0 20px 60px -18px hsl(227 95% 71% / 0.6)',
      'shadow-glass':   '0 8px 32px hsl(232 40% 6% / 0.45), inset 0 1px 0 hsl(228 80% 96% / 0.10)',
      'shadow-elegant': '0 30px 80px -28px hsl(227 95% 71% / 0.45)',
      'shadow-card':    '0 4px 24px hsl(232 40% 6% / 0.35), inset 0 1px 0 hsl(228 80% 96% / 0.07)',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Lavender Dusk  ·  deep purple / pink
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'lavender',
    name: 'Lavender Dusk',
    mode: 'dark',
    previewGradient: 'linear-gradient(135deg, #1e1340 0%, #9b59cc 50%, #f07bc4 100%)',
    vars: {
      'background':           '256 40% 15%',
      'foreground':           '260 45% 98%',
      'card':                 '258 34% 20%',
      'card-foreground':      '260 45% 98%',
      'popover':              '258 34% 20%',
      'popover-foreground':   '260 45% 98%',
      'primary':              '265 88% 76%',
      'primary-foreground':   '256 40% 12%',
      'primary-glow':         '285 90% 72%',
      'secondary':            '258 26% 27%',
      'secondary-foreground': '260 45% 98%',
      'muted':                '258 24% 23%',
      'muted-foreground':     '260 20% 78%',
      'accent':               '326 82% 74%',
      'accent-foreground':    '256 40% 12%',
      'destructive':          '0 70% 66%',
      'destructive-foreground':'260 45% 98%',
      'border':               '258 32% 32%',
      'input':                '258 32% 27%',
      'ring':                 '265 88% 76%',
      'glass-bg':             '258 32% 26%',
      'glass-border':         '265 60% 68%',
      'glass-shine':          '262 95% 98%',
      // sticker hue-rotate
      'sticker-hue-shift':    '25deg',
      // aurora blobs
      'aurora-blob-1':        '265 88% 76%',
      'aurora-blob-2':        '326 82% 74%',
      'aurora-blob-3':        '199 90% 70%',
      'aurora-blob-4':        '310 70% 72%',
      'aurora-blob-5':        '285 80% 72%',
      // gradients
      'gradient-aurora':      'linear-gradient(135deg, hsl(265 88% 76%), hsl(326 82% 74%) 50%, hsl(199 90% 70%))',
      'gradient-mesh':
        'radial-gradient(at 15% 25%, hsl(265 88% 70% / 0.30) 0px, transparent 52%),' +
        'radial-gradient(at 85% 10%, hsl(326 82% 70% / 0.24) 0px, transparent 52%),' +
        'radial-gradient(at 70% 85%, hsl(199 90% 65% / 0.22) 0px, transparent 52%),' +
        'radial-gradient(at 10% 90%, hsl(285 80% 68% / 0.18) 0px, transparent 50%)',
      'gradient-text':        'linear-gradient(135deg, hsl(262 70% 94%), hsl(265 88% 78%), hsl(326 82% 76%))',
      // shadows
      'shadow-glow':    '0 20px 60px -18px hsl(265 88% 76% / 0.6)',
      'shadow-glass':   '0 8px 32px hsl(258 40% 6% / 0.45), inset 0 1px 0 hsl(262 95% 98% / 0.10)',
      'shadow-elegant': '0 30px 80px -28px hsl(265 88% 76% / 0.45)',
      'shadow-card':    '0 4px 24px hsl(258 40% 6% / 0.35), inset 0 1px 0 hsl(262 95% 98% / 0.07)',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Midnight Ocean  ·  deep teal / cyan
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'ocean',
    name: 'Midnight Ocean',
    mode: 'dark',
    previewGradient: 'linear-gradient(135deg, #0d2233 0%, #1a7a8a 55%, #3ee8c4 100%)',
    vars: {
      'background':           '208 48% 11%',
      'foreground':           '195 40% 97%',
      'card':                 '208 42% 17%',
      'card-foreground':      '195 40% 97%',
      'popover':              '208 42% 17%',
      'popover-foreground':   '195 40% 97%',
      'primary':              '178 72% 60%',
      'primary-foreground':   '208 48% 8%',
      'primary-glow':         '185 75% 55%',
      'secondary':            '208 32% 24%',
      'secondary-foreground': '195 40% 97%',
      'muted':                '208 28% 19%',
      'muted-foreground':     '200 22% 68%',
      'accent':               '195 65% 52%',
      'accent-foreground':    '208 48% 8%',
      'destructive':          '0 70% 66%',
      'destructive-foreground':'195 40% 97%',
      'border':               '208 30% 30%',
      'input':                '208 30% 22%',
      'ring':                 '178 72% 60%',
      'glass-bg':             '208 36% 20%',
      'glass-border':         '178 50% 52%',
      'glass-shine':          '195 80% 96%',
      // sticker hue-rotate
      'sticker-hue-shift':    '160deg',
      // aurora blobs
      'aurora-blob-1':        '178 72% 60%',
      'aurora-blob-2':        '195 65% 52%',
      'aurora-blob-3':        '165 60% 55%',
      'aurora-blob-4':        '210 55% 50%',
      'aurora-blob-5':        '185 70% 48%',
      // gradients
      'gradient-aurora':      'linear-gradient(135deg, hsl(178 72% 60%), hsl(195 65% 52%) 50%, hsl(165 60% 65%))',
      'gradient-mesh':
        'radial-gradient(at 15% 25%, hsl(178 72% 60% / 0.28) 0px, transparent 52%),' +
        'radial-gradient(at 85% 10%, hsl(195 65% 52% / 0.22) 0px, transparent 52%),' +
        'radial-gradient(at 70% 85%, hsl(165 60% 55% / 0.20) 0px, transparent 52%),' +
        'radial-gradient(at 10% 90%, hsl(210 55% 50% / 0.16) 0px, transparent 50%)',
      'gradient-text':        'linear-gradient(135deg, hsl(195 60% 94%), hsl(178 72% 72%), hsl(195 60% 68%))',
      // shadows
      'shadow-glow':    '0 20px 60px -18px hsl(178 72% 60% / 0.6)',
      'shadow-glass':   '0 8px 32px hsl(208 50% 5% / 0.50), inset 0 1px 0 hsl(195 80% 96% / 0.10)',
      'shadow-elegant': '0 30px 80px -28px hsl(178 72% 60% / 0.45)',
      'shadow-card':    '0 4px 24px hsl(208 50% 5% / 0.40), inset 0 1px 0 hsl(195 80% 96% / 0.07)',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LIGHT THEMES
  // ═══════════════════════════════════════════════════════════════════════════

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Cloud Nine  ·  crisp white with electric blue
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cloud-nine',
    name: 'Cloud Nine',
    mode: 'light',
    previewGradient: 'linear-gradient(135deg, #ddeeff 0%, #4f88f8 50%, #7ba8fc 100%)',
    vars: {
      'background':           '216 45% 97%',
      'foreground':           '220 55% 12%',
      'card':                 '216 38% 94%',
      'card-foreground':      '220 55% 12%',
      'popover':              '216 38% 94%',
      'popover-foreground':   '220 55% 12%',
      'primary':              '221 88% 56%',
      'primary-foreground':   '0 0% 100%',
      'primary-glow':         '226 85% 56%',
      'secondary':            '216 28% 88%',
      'secondary-foreground': '220 55% 16%',
      'muted':                '216 22% 92%',
      'muted-foreground':     '220 28% 46%',
      'accent':               '238 75% 62%',
      'accent-foreground':    '0 0% 100%',
      'destructive':          '0 72% 52%',
      'destructive-foreground':'0 0% 100%',
      'border':               '216 22% 86%',
      'input':                '216 22% 93%',
      'ring':                 '221 88% 56%',
      'glass-bg':             '216 60% 99%',
      'glass-border':         '221 55% 72%',
      'glass-shine':          '216 90% 99%',
      // sticker hue-rotate
      'sticker-hue-shift':    '195deg',
      // aurora blobs — saturated blues on white
      'aurora-blob-1':        '221 88% 56%',
      'aurora-blob-2':        '238 75% 62%',
      'aurora-blob-3':        '210 80% 65%',
      'aurora-blob-4':        '245 60% 68%',
      'aurora-blob-5':        '228 82% 60%',
      // gradients
      'gradient-aurora':      'linear-gradient(135deg, hsl(221 88% 56%), hsl(238 75% 62%) 50%, hsl(210 80% 65%))',
      'gradient-mesh':
        'radial-gradient(at 15% 25%, hsl(221 88% 56% / 0.09) 0px, transparent 52%),' +
        'radial-gradient(at 85% 10%, hsl(238 75% 62% / 0.07) 0px, transparent 52%),' +
        'radial-gradient(at 70% 85%, hsl(210 80% 65% / 0.06) 0px, transparent 52%),' +
        'radial-gradient(at 10% 90%, hsl(245 60% 68% / 0.05) 0px, transparent 50%)',
      'gradient-text':        'linear-gradient(135deg, hsl(221 88% 44%), hsl(238 80% 55%), hsl(221 78% 50%))',
      // shadows — light and airy
      'shadow-glow':    '0 20px 60px -18px hsl(221 88% 56% / 0.35)',
      'shadow-glass':   '0 8px 32px hsl(220 40% 60% / 0.14), inset 0 1px 0 hsl(216 90% 99% / 0.90)',
      'shadow-elegant': '0 30px 80px -28px hsl(221 88% 56% / 0.24)',
      'shadow-card':    '0 4px 24px hsl(220 40% 60% / 0.11), inset 0 1px 0 hsl(216 90% 99% / 0.70)',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Cherry Blossom  ·  warm cream with soft rose
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom',
    mode: 'light',
    previewGradient: 'linear-gradient(135deg, #ffeef4 0%, #e8507a 50%, #f4a0bc 100%)',
    vars: {
      'background':           '345 42% 97%',
      'foreground':           '345 52% 11%',
      'card':                 '345 32% 93%',
      'card-foreground':      '345 52% 11%',
      'popover':              '345 32% 93%',
      'popover-foreground':   '345 52% 11%',
      'primary':              '335 78% 52%',
      'primary-foreground':   '0 0% 100%',
      'primary-glow':         '325 74% 52%',
      'secondary':            '345 22% 87%',
      'secondary-foreground': '345 52% 16%',
      'muted':                '345 16% 91%',
      'muted-foreground':     '345 22% 46%',
      'accent':               '12 72% 56%',
      'accent-foreground':    '0 0% 100%',
      'destructive':          '0 72% 52%',
      'destructive-foreground':'0 0% 100%',
      'border':               '345 20% 86%',
      'input':                '345 20% 93%',
      'ring':                 '335 78% 52%',
      'glass-bg':             '345 55% 99%',
      'glass-border':         '335 45% 68%',
      'glass-shine':          '345 90% 99%',
      // sticker hue-rotate
      'sticker-hue-shift':    '345deg',
      // aurora blobs — pinks and rose on white
      'aurora-blob-1':        '335 78% 52%',
      'aurora-blob-2':        '12 72% 56%',
      'aurora-blob-3':        '320 65% 60%',
      'aurora-blob-4':        '355 58% 56%',
      'aurora-blob-5':        '325 70% 58%',
      // gradients
      'gradient-aurora':      'linear-gradient(135deg, hsl(335 78% 52%), hsl(12 72% 56%) 50%, hsl(320 65% 62%))',
      'gradient-mesh':
        'radial-gradient(at 15% 25%, hsl(335 78% 52% / 0.09) 0px, transparent 52%),' +
        'radial-gradient(at 85% 10%, hsl(12 72% 56% / 0.07) 0px, transparent 52%),' +
        'radial-gradient(at 70% 85%, hsl(320 65% 60% / 0.06) 0px, transparent 52%),' +
        'radial-gradient(at 10% 90%, hsl(355 58% 56% / 0.05) 0px, transparent 50%)',
      'gradient-text':        'linear-gradient(135deg, hsl(335 78% 40%), hsl(12 75% 50%), hsl(335 70% 46%))',
      // shadows
      'shadow-glow':    '0 20px 60px -18px hsl(335 78% 52% / 0.35)',
      'shadow-glass':   '0 8px 32px hsl(340 40% 60% / 0.14), inset 0 1px 0 hsl(345 90% 99% / 0.90)',
      'shadow-elegant': '0 30px 80px -28px hsl(335 78% 52% / 0.24)',
      'shadow-card':    '0 4px 24px hsl(340 40% 60% / 0.11), inset 0 1px 0 hsl(345 90% 99% / 0.70)',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Matcha  ·  ivory with sage green
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'matcha',
    name: 'Matcha',
    mode: 'light',
    previewGradient: 'linear-gradient(135deg, #eef6ee 0%, #3d9c60 50%, #5dc68a 100%)',
    vars: {
      'background':           '140 34% 96%',
      'foreground':           '148 52% 10%',
      'card':                 '140 26% 92%',
      'card-foreground':      '148 52% 10%',
      'popover':              '140 26% 92%',
      'popover-foreground':   '148 52% 10%',
      'primary':              '152 60% 38%',
      'primary-foreground':   '0 0% 100%',
      'primary-glow':         '162 56% 38%',
      'secondary':            '140 18% 86%',
      'secondary-foreground': '148 52% 14%',
      'muted':                '140 14% 90%',
      'muted-foreground':     '148 18% 44%',
      'accent':               '178 56% 38%',
      'accent-foreground':    '0 0% 100%',
      'destructive':          '0 72% 52%',
      'destructive-foreground':'0 0% 100%',
      'border':               '140 16% 84%',
      'input':                '140 16% 91%',
      'ring':                 '152 60% 38%',
      'glass-bg':             '140 52% 98%',
      'glass-border':         '152 38% 60%',
      'glass-shine':          '140 75% 99%',
      // sticker hue-rotate
      'sticker-hue-shift':    '130deg',
      // aurora blobs — greens and sage on white
      'aurora-blob-1':        '152 60% 38%',
      'aurora-blob-2':        '178 56% 38%',
      'aurora-blob-3':        '135 52% 48%',
      'aurora-blob-4':        '165 50% 44%',
      'aurora-blob-5':        '148 55% 42%',
      // gradients
      'gradient-aurora':      'linear-gradient(135deg, hsl(152 60% 38%), hsl(178 56% 38%) 50%, hsl(135 52% 48%))',
      'gradient-mesh':
        'radial-gradient(at 15% 25%, hsl(152 60% 38% / 0.09) 0px, transparent 52%),' +
        'radial-gradient(at 85% 10%, hsl(178 56% 38% / 0.07) 0px, transparent 52%),' +
        'radial-gradient(at 70% 85%, hsl(135 52% 48% / 0.06) 0px, transparent 52%),' +
        'radial-gradient(at 10% 90%, hsl(165 50% 44% / 0.05) 0px, transparent 50%)',
      'gradient-text':        'linear-gradient(135deg, hsl(152 60% 28%), hsl(178 58% 32%), hsl(152 55% 32%))',
      // shadows
      'shadow-glow':    '0 20px 60px -18px hsl(152 60% 38% / 0.35)',
      'shadow-glass':   '0 8px 32px hsl(148 35% 60% / 0.14), inset 0 1px 0 hsl(140 75% 99% / 0.90)',
      'shadow-elegant': '0 30px 80px -28px hsl(152 60% 38% / 0.24)',
      'shadow-card':    '0 4px 24px hsl(148 35% 60% / 0.11), inset 0 1px 0 hsl(140 75% 99% / 0.70)',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. Ember Night  ·  charcoal / copper / ember
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'ember-night',
    name: 'Ember Night',
    mode: 'dark',
    previewGradient: 'linear-gradient(135deg, #21151a 0%, #b95745 52%, #f2b36d 100%)',
    vars: {
      'background':           '12 28% 12%',
      'foreground':           '28 38% 97%',
      'card':                 '15 25% 18%',
      'card-foreground':      '28 38% 97%',
      'popover':              '15 25% 18%',
      'popover-foreground':   '28 38% 97%',
      'primary':              '18 82% 68%',
      'primary-foreground':   '12 28% 10%',
      'primary-glow':         '34 88% 68%',
      'secondary':            '15 22% 27%',
      'secondary-foreground': '28 38% 97%',
      'muted':                '15 20% 22%',
      'muted-foreground':     '25 22% 73%',
      'accent':               '2 65% 63%',
      'accent-foreground':    '12 28% 10%',
      'destructive':          '0 70% 66%',
      'destructive-foreground':'28 38% 97%',
      'border':               '18 25% 35%',
      'input':                '15 25% 26%',
      'ring':                 '18 82% 68%',
      'glass-bg':             '16 24% 24%',
      'glass-border':         '24 62% 64%',
      'glass-shine':          '32 80% 97%',
      'sticker-hue-shift':    '335deg',
      'aurora-blob-1':        '18 82% 68%',
      'aurora-blob-2':        '2 65% 63%',
      'aurora-blob-3':        '34 88% 68%',
      'aurora-blob-4':        '350 62% 62%',
      'aurora-blob-5':        '25 80% 58%',
      'gradient-aurora':      'linear-gradient(135deg, hsl(18 82% 68%), hsl(2 65% 63%) 50%, hsl(34 88% 68%))',
      'gradient-mesh':
        'radial-gradient(at 15% 25%, hsl(18 82% 68% / 0.28) 0px, transparent 52%),' +
        'radial-gradient(at 85% 10%, hsl(2 65% 63% / 0.22) 0px, transparent 52%),' +
        'radial-gradient(at 70% 85%, hsl(34 88% 68% / 0.20) 0px, transparent 52%),' +
        'radial-gradient(at 10% 90%, hsl(350 62% 62% / 0.16) 0px, transparent 50%)',
      'gradient-text':        'linear-gradient(135deg, hsl(28 70% 96%), hsl(18 88% 76%), hsl(34 88% 72%))',
      'shadow-glow':    '0 20px 60px -18px hsl(18 82% 68% / 0.55)',
      'shadow-glass':   '0 8px 32px hsl(12 35% 5% / 0.50), inset 0 1px 0 hsl(32 80% 97% / 0.10)',
      'shadow-elegant': '0 30px 80px -28px hsl(18 82% 68% / 0.42)',
      'shadow-card':    '0 4px 24px hsl(12 35% 5% / 0.38), inset 0 1px 0 hsl(32 80% 97% / 0.07)',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. Pearl Tide  ·  cool pearl / indigo / seafoam
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'pearl-tide',
    name: 'Pearl Tide',
    mode: 'light',
    previewGradient: 'linear-gradient(135deg, #eef8f8 0%, #4b92a5 52%, #8c7fe8 100%)',
    vars: {
      'background':           '190 38% 97%',
      'foreground':           '215 42% 13%',
      'card':                 '190 28% 93%',
      'card-foreground':      '215 42% 13%',
      'popover':              '190 28% 93%',
      'popover-foreground':   '215 42% 13%',
      'primary':              '190 60% 42%',
      'primary-foreground':   '0 0% 100%',
      'primary-glow':         '248 65% 62%',
      'secondary':            '190 22% 87%',
      'secondary-foreground': '215 42% 16%',
      'muted':                '190 16% 91%',
      'muted-foreground':     '210 22% 45%',
      'accent':               '248 65% 62%',
      'accent-foreground':    '0 0% 100%',
      'destructive':          '0 72% 52%',
      'destructive-foreground':'0 0% 100%',
      'border':               '190 20% 84%',
      'input':                '190 20% 92%',
      'ring':                 '190 60% 42%',
      'glass-bg':             '190 48% 99%',
      'glass-border':         '190 38% 66%',
      'glass-shine':          '190 80% 99%',
      'sticker-hue-shift':    '175deg',
      'aurora-blob-1':        '190 60% 42%',
      'aurora-blob-2':        '248 65% 62%',
      'aurora-blob-3':        '178 58% 52%',
      'aurora-blob-4':        '220 58% 63%',
      'aurora-blob-5':        '202 64% 52%',
      'gradient-aurora':      'linear-gradient(135deg, hsl(190 60% 42%), hsl(248 65% 62%) 50%, hsl(178 58% 52%))',
      'gradient-mesh':
        'radial-gradient(at 15% 25%, hsl(190 60% 42% / 0.09) 0px, transparent 52%),' +
        'radial-gradient(at 85% 10%, hsl(248 65% 62% / 0.08) 0px, transparent 52%),' +
        'radial-gradient(at 70% 85%, hsl(178 58% 52% / 0.06) 0px, transparent 52%),' +
        'radial-gradient(at 10% 90%, hsl(220 58% 63% / 0.05) 0px, transparent 50%)',
      'gradient-text':        'linear-gradient(135deg, hsl(190 68% 32%), hsl(248 68% 52%), hsl(190 62% 38%))',
      'shadow-glow':    '0 20px 60px -18px hsl(190 60% 42% / 0.32)',
      'shadow-glass':   '0 8px 32px hsl(205 35% 55% / 0.14), inset 0 1px 0 hsl(190 80% 99% / 0.90)',
      'shadow-elegant': '0 30px 80px -28px hsl(190 60% 42% / 0.22)',
      'shadow-card':    '0 4px 24px hsl(205 35% 55% / 0.11), inset 0 1px 0 hsl(190 80% 99% / 0.70)',
    },
  },
];

export const DEFAULT_THEME_ID = 'indigo';
